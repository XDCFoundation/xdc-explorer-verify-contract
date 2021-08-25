const Config = require("./index");
const {AMQPManager} = require("lh-utilities");
const {DBConnectionUtils} = require("lh-utilities");
const {UtilMethods} = require("lh-utilities");
module.exports = {
    async connectToDB() {
        let connectionError;
        [connectionError, db_connection] = await UtilMethods.parseResponse(DBConnectionUtils.connect());
        if (connectionError) {
            UtilMethods.lhtLog('connectToDB', 'unable to connect to DB', connectionError, '');
            throw connectionError;
        }
        UtilMethods.lhtLog('connectToDB', 'connect to DB successfully', '', '');
        return db_connection;
    }
};