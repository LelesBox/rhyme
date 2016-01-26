/**
 * Created by blake on 1/17/16.
 */
module.exports = {
    "get /": "RecordController.index",
    "post /:id": {
        controller: "RecordController.saveData"
    },
    "get /:id": "RecordController.getData",
    "get /test": {
        controller: "RecordController.test",
        filter: ["Filter.test"]
    }
}