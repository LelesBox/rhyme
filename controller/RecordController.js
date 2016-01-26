/**
 * Created by blake on 1/17/16.
 */
module.exports = {
    index: function * (next) {
        try {
            this.body = yield RecordService.index(this)
        } catch (ex) {
            this.body = ex
        }
    },
    saveData: function * (next) {
        try {
            this.body = yield RecordService.saveData(this)
        } catch (ex) {
            this.body = ex
        }
    },
    getData: function * () {
        try {
            this.body = yield RecordService.getData(this.params.id)
        } catch (ex) {
            this.body = ex
        }
    },
    test: function * () {
        return this.response.body = "TEST OK!"
    }
}