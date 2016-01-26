/**
 * Created by blake on 1/26/16.
 */
var colors = require('colors')
var themes = {
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'red',
    info: 'green',
    data: 'blue',
    help: 'cyan',
    warn: 'yellow',
    debug: 'magenta',
    error: 'red'
}

colors.setTheme(themes);

var log = {}
for (var t in themes) {
    (function (theme) {
        log[theme] = function () {
            var args = Array.prototype.slice.call(arguments, 0)
            for (var i = 0; i < args.length; i++) {
                if (typeof args[i] === 'object') {
                    if (args[i].stack)
                        args[i] = args[i].stack[theme]
                    else
                        args[i] = args[i][theme]
                }
            }
            console.log.apply(this, args)
        }
    }(t))
}
log.color = themes
module.exports = log;