"use strict";
const Mongoose = require("mongoose");
const Constants = require("./../../config/constants");
Mongoose.Promise = Promise;
console.log('mongoose version:', Mongoose.version);
class DataAccess {
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = Mongoose.connection;
        this.mongooseInstance = Mongoose.connect(Constants.DB_CONNECTION_STRING, { useCreateIndex: true, useNewUrlParser: true });
        this.mongooseConnection.once("open", () => {
            console.log("Ready to Operate");
        });
        Mongoose.connection.on('connected', () => {
            console.log('Successfully connected: DBURL----' + Constants.DB_CONNECTION_STRING);
        });
        Mongoose.connection.on('error', (err) => {
            console.log('Mongoose connection error: ' + err);
        });
        Mongoose.connection.on('disconnected', () => {
            console.log('-> lost connection');
        });
        Mongoose.connection.on('reconnect', () => {
            console.log('-> reconnected');
        });
        Mongoose.connection.on('reconnectFailed', () => {
            console.log('-> gave up reconnecting');
        });
        process.on('SIGINT', () => {
            Mongoose.connection.on('close', () => {
                console.log('Mongoose disconnected through app termination');
                process.exit(0);
            });
        });
        process.on('uncaughtException', (exception) => {
            console.log("----------------------------UncaughtException: -----------------------", exception);
        });
        return this.mongooseInstance;
    }
}
DataAccess.connect();
module.exports = DataAccess;
//# sourceMappingURL=DataAccess.js.map