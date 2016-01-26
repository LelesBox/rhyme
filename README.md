## Todo

### 说两句
    1.  因为是一个完整框架,需要不同文件夹的支持,所以不能当做一个单独类库发布而更应该是一个类似yo的generator
    2.  所以我的想法是提供一个rhyme-cli,使用这个命令行可以生产一个新的工程目录结构

### Server
    1.  实现基于KOA的MVC架构,暂时还没有数据库
    2.  文件夹组织结构(以下的文件夹内出来asset和views之外定义的方法都可以用全局对象访问不需要require)
        1.  asset静态文件,前端开发过程中
        2.  config配置文件
        3.  filter过滤器,类似于中间件或者sails里的policy
        4.  views视图文件
        5.  router路由结构
        6.  util工具文件夹
        7.  model如果有数据库的话
        
### TODO
    1.  提交npm
    2.  命令行生成模板
    3.  模板文件放在github
    
    