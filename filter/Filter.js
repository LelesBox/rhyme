/**
 * Created by blake on 1/17/16.
 */
module.exports = {
    test: function *(next) {
        if (this.query["test"] === "test") {
            yield next
        } else {
            return this.body = "forbidden"
        }
    }
}