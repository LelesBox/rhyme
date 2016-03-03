/**
 * Created by blake on 12/31/15.
 */
var koa = require('koa')
var fs = require('fs')
var co = require('co')
var path = require('path')
var router = require('koa-router')()
var koaBody = require('koa-body')({
    multipart: true
})
var render = require('koa-ejs')
var redisStore = require('koa-redis');
var rhymelog = require('./lib/log')
var session = require('koa-generic-session');
var APP = koa()
APP.proxy = true
//扫描指定目录,并自动加载require到全局
var globalName = "rhyme";
global.rhyme = {
    env: process.env.NODE_ENV || "development"
}

//设定应用根目录

//默认扫描的文件夹
global.rhyme.dirs = [
    'config',
    'util',
    'router',
    'service',
    'controller',
    'filter',
    //'data',
    'model'
]

var rhymeApp = {}

//启动方法
rhymeApp.lift = (prefix) => {
    var dirs = global[globalName].dirs
    for (var i = 0; i < dirs.length; i++) {
        var p = dirs[i]
        // 扫描文件夹
        autoScan(path.resolve(process.cwd(), prefix || ".") + '/' + p, [p])
    }
    boot(APP)
    APP.listen(rhyme.config.port || 2333)
}

/**
 * 自动扫描文件夹并require,
 * @param prefix 文件夹路径
 * @param tree 文件夹层级,按左到右是文件夹的层级
 */
function autoScan(prefix, tree) {
    var items = fs.readdirSync(prefix)
    for (var j = 0; j < items.length; j++) {
        var p = items[j]
        var addr = prefix + '/' + p
        if (fs.statSync(addr).isDirectory()) {
            var ntree = [].concat(tree)
            ntree.push(p)
            autoScan(addr, ntree)
        } else {
            if (p.indexOf(".js") === -1) continue
            var fname = p.replace('.js', '')
            var r = global[globalName]
            var obj = arrToObjNest(tree.concat(fname), prefix + '/' + fname)
            //如果是controller或者filter或者model,则直接挂载在全局
            merge(r, obj)
        }
    }
    //    挂载结束后,启动
}

//把数组变成对象如:['a','b','c','d']=>{a:{b:{c:{d:{}}}}}
//当遇到index时,index下的属性会提升到和index平级的属性
function arrToObjNest(tree, fname) {
    var objStr = ''
    var index = 0
    for (var i = 0; i < tree.length; i++) {
        objStr += '{' + tree[i] + ':'
        index++
    }
    objStr += "require('" + fname + "')"
    while (index--) {
        objStr += "}"
    }
    return new Function('require', 'return ' + objStr)(require)
}

//Object.assign mixin
function merge(target, mix) {
    for (var key in mix) {
        if (mix.hasOwnProperty(key)) {
            if (target.hasOwnProperty(key))
                merge(target[key], mix[key])
            else
                target[key] = mix[key]
        }
    }
    return target
}

//启动 比如挂载路由
function boot(app) {
    // 挂载全局log方法
    rhyme["log"] = rhymelog
    //把四大金刚移到rhyme全局对象中
    var controller = rhyme["controller"]
    var filter = rhyme["filter"]
    var model = rhyme["model"]
    var service = rhyme["service"]
    //koa-passport
    enPorpGlobalable(controller)
    enPorpGlobalable(filter)
    enPorpGlobalable(model)
    enPorpGlobalable(service)
    //让某个对象里的属性全局- -英文随便取的 看注释就好
    //把诸如controller filter里面的属性提升到全局
    function enPorpGlobalable(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                global[key] = obj[key]
        }
        return this
    }

    co(function*() {
        //扫描配置 index env.development env.product
        scanConfig()
        //设置keys
        app.keys = rhyme.config.keys
        //session是否开启redis ,默认不开启
        if (rhyme.config.redis) {
            app.use(session(merge({
                store: redisStore()
            }, rhyme.config.options.sessionOptions)));
        } else {
            app.use(session(rhyme.config.options.sessionOptions))
        }
        //是否启用passport
        if (rhyme.config.passport) {
            var passport = require('koa-passport')
            var passportMiddleware = rhyme.config.passport
            if (passportMiddleware) {
                for (var k in passportMiddleware) {
                    passport.use(passportMiddleware[k])
                }
                passport.serializeUser(function (user, done) {
                    done(null, user)
                })
                passport.deserializeUser(function (user, done) {
                    done(null, user)
                })
                app.use(passport.initialize())
                app.use(passport.session())
            }
        }
        //启动路由
        scanRouter(app)
        //如果带上connection参数则表示启用数据库
        if (rhyme.config.connection)
            yield liftDatabase()
        //启用views engine
        if (rhyme.config.options.viewsOptions) {
            render(app, rhyme.config.options.viewsOptions);
        }
        rhyme.config.bootstrap && rhyme.config.bootstrap.call(null)
    }).catch((err) => {
        rhymelog.error(err)
        //没有在主线程中被抛错,所以没有终止?
        throw err
    })
}

/**
 * 挂载路由,执行到这一步的时候,文件都已经require完毕且都挂载在全局对象中,这里我们只关注router对象
 * @param app
 */
function scanRouter(app) {

    //把router里面的index提升到根目录"/"
    var indexRouter = rhyme.router.index
    for (var key in indexRouter) {
        if (indexRouter.hasOwnProperty(key))
            rhyme.router[key] = indexRouter[key]
    }

    delete rhyme.router.index
    //    遍历字属性里的index,也把他们提升到对应的根目录
    var porps = []
    porps.push(rhyme.router)
    //把router子文件夹里的index也提升到该文件夹的根目录
    // 比如,test文件夹下啊index.js定义的 'get /a':'test.s',此时访问路径应该是 /test/a
    while (porp = porps.shift()) {
        if (!porp) break
        for (key in porp) {
            if (hasPorp(porp, key)) {

                if (key === "index") {

                    //    up up up
                    for (var k in porp.index) {
                        if (hasPorp(porp.index, k)) {
                            porp[k] = porp.index[k]
                        }
                    }
                    delete porp.index
                } else if (key.indexOf(" ") === -1 && key !== 'config') { //搜索子文件夹,但是得忽略config等全局配置文件
                    porps.push(porp[key])
                }
            }
        }
    }
    //    遍历属性,直到找到类似 "get /test/"为止,不在上一步做这个操作的原因是在提升index属性时无法保证当前的porp是否会被遍历到
    //    找到后对路径进行补全,因为 /test并不是最终路径 所以分开做,功能逻辑更清晰些
    porps.push({
        prefix: "",
        route: rhyme.router
    })
    while (porp = porps.shift()) {
        if (!porp) break
        var prefix = porp.prefix
        if (hasPorp(porp.route, 'config')) {
            //    取出config
            //如果存在key为config,则表示全局配置,目前可配置filter,
            //此处做法是逐个转换当前对象的键值为 成'get /':{controller:'aa.ss',filter:[]},
            var config = porp.route['config']
            if (config) {
                //如果存在filter
                var filter = config.filter || []
                for (var k in porp.route) {
                    //    转换
                    //    如果值是字符串则表示只有一个controller
                    if (k.indexOf(" ") > -1) {
                        var p = porp.route[k]
                        if (typeof p === 'string') {
                            porp.route[k] = {
                                controller: p,
                                filter: filter
                            }
                        }
                        //如果值本身是对象,且含有filter,则添加在filter的前面
                        else if (typeof p === 'object' && p.controller) {
                            porp.route[k] = {
                                controller: p.controller,
                                filter: filter.concat(p.filter || [])
                            }
                        }
                    }
                    delete porp.route['config']
                }
            }
        }

        for (key in porp.route) {
            if (hasPorp(porp.route, key)) {
                if (key.indexOf(" ") > -1) {
                    applyRouter(prefix, key, porp.route[key], app)
                } else {
                    porps.push({
                        prefix: prefix + "/" + key,
                        route: porp.route[key]
                    })
                }
            }
        }
    }
}

function applyRouter(prefix, path, value, app) {
    var p = path.split(" ")
    var method = p[0]
    var url = p[1]
    if (prefix !== "")
        url = (prefix + url).replace(/\/$/, "")
    var controller = value
    var filter = []
    if (value.controller)
        controller = value.controller
    if (value.filter)
        filter = value.filter
    //以上得到还只是字符串,要拿到对应的对象
    var params = filter.map((item, index, arr) => {
        item = "global['" + item.replace(/\./ig, "']['") + "']"
        return new Function('global', 'return ' + item)(global)
    })
    //把xx.xx.xx变成global[xx][xx][xx]
    var ctr = "global['" + controller.replace(/\./ig, "']['") + "']"
    controller = new Function('global', 'return ' + ctr)(global)
    if (!controller) return
    params.push(controller)
    params.unshift(koaBody)
    params.unshift(url)
    router[method].apply(router, params)
    app.use(router.routes());
}

//处理config,把env里面的文件提升为rhyme下的属性,并分为production和development,甚至可以自己添加一个配置文件
function scanConfig() {
    //    提升config.index,会被下面的特定配置给覆盖
    for (var k in rhyme.config.index) {
        if (hasPorp(rhyme.config.index, k)) {
            rhyme.config[k] = rhyme.config.index[k]
        }
    }
    for (var key in rhyme.config.env[rhyme.env]) {
        if (hasPorp(rhyme.config.env[rhyme.env], key)) {
            rhyme.config[key] = rhyme.config.env[rhyme.env][key]
        }
    }
}

/**
 * 启动数据库支持(使用sails的waterline)
 */
function liftDatabase() {
    var Waterline = require("Waterline")
    var orm = new Waterline();
    if (!rhyme.model) return
    //Model与tableName的对象映射,因为生成model的时候 model名字是table,但我们希望model名字是文件名如果Pet,User
    var dict = {}
    for (var k in rhyme.model) {
        if (hasPorp(rhyme.model, k)) {
            var modelConfig = rhyme.model[k]
            dict[modelConfig.tableName] = k
            modelConfig["connection"] = rhyme.config.connection
            orm.loadCollection(Waterline.Collection.extend(modelConfig));
        }
    }
    return new Promise((resolve, reject) => {
        orm.initialize(rhyme.config.mongodb, (err, models) => {
            if (err) return reject(err);
            models = models.collections;
            //挂载到全局对象和rhyme对象
            rhyme["Model"] = {}
            for (var m in models) {
                global[dict[m]] = models[m]
                rhyme["Model"][dict[m]] = models[m]
            }
            return resolve()
        })
    })
}

//启动视图引擎
function* liftViewEngine(app) {
    render(app, rhyme.config.options.viewsOptions);
}

/**
 * 参数是用逗号分开的一个个目录
 * 执行方法,用一个对象保存起来,因为对象保存方便验证查找该路径是否存在,约定只识别工程根目录下的文件夹
 */
rhymeApp.addMountDirs = () => {
    var dirs = Array.prototype.slice.call(arguments)
    var _dirs = global[globalName]._dirs = {}
    for (var i = 0; i < dirs.length; i++) {
        _dirs.push(dirs[i])
    }
}

//use,代理koa的use
rhymeApp.use = (gen) => {
    APP.use(gen)
}

//expose koa app
rhymeApp.app = APP

function hasPorp(obj, key) {
    return obj.hasOwnProperty(key);
}


module.exports = rhymeApp
