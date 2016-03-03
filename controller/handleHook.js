/**
 * Created by blake on 3/3/16.
 */
module.exports = {
    //更简单的方法快速填写路由方法
    "get /test": function *() {
        console.log("ASDSAD")
        console.log(this.request)
        this.body = "hello test"
    },
    "post /test": function *() {
        console.log("request")
        console.log(this.request)
        console.log("body")
        console.log(JSON.stringify(this.request.body))
        this.body = "hello test"
    }
}