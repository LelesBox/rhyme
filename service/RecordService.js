/**
 * Created by blake on 1/17/16.
 */
var fs = require('fs')

module.exports = {
    index: function* (context) {
        return "RecordController Service OK"
    },
    /**
     * 获取传过来的时间散列数组
     * @param context
     * @returns {Promise}
     */
    saveData: function (context) {
        var data = context.request.body.data || []
        var id = context.params.id
        return new Promise(function (resolve, reject) {
            if (data.length > 0) {
                fs.writeFile(__dirname + "/" + id + ".txt", data, 'utf-8', function (err) {
                    if (err)
                        return reject(err)
                    return resolve("save")
                })
            } else {
                return reject("please send data")
            }
        })
    },
    getData: function* (id) {
        return new Promise(function (resolve, reject) {
            fs.readFile(__dirname + "/" + id + ".txt", 'utf-8', function (err, text) {
                if (err)
                    return reject(err)
                return resolve(text)
            })
        })
    }
}