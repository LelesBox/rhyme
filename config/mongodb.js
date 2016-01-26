/**
 * Created by blake on 1/20/16.
 */
var mongoAdapter = require('sails-mongo')
module.exports = {
    adapters: {
        'default': mongoAdapter,
        mongo: mongoAdapter
    },
    connections: {
        myLocalMongo: {
            adapter: 'mongo',
            host: 'localhost',
            port: 27017, // defaults to 27017 if omitted
            //user: 'username_here', // or omit if not relevant
            //password: 'password_here', // or omit if not relevant
            database: 'foobar'
        }
    },
    defaults: {
        migrate: 'alter'
    }
}