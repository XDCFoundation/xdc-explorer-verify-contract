/**
 * Created by Developer on 13/05/21.
 */
const BLManager = require("./app/manager");
const UtilMethods = require("lh-utilities/utilityMethods");
const Connection = require("./config/connection");
global.db_connection = undefined;

exports.getVerifyContract = async (event, context, callback) => {

    let db_connection;
    console.log('event details',event)
    UtilMethods.lhtLog("getVerifyContract", "db_connection object null", "", "", "INFO");
    db_connection = await Connection.connectToDB();
    UtilMethods.lhtLog("getVerifyContract", "event", event, "", "INFO");
    const [error, response] = await UtilMethods.parseResponse(new BLManager().getVerifyContract(event.body));
    UtilMethods.lhtLog("index:getVerifyContract", "getVerifyContract response", { error, response }, "", "INFO");
    /*
    to Disconnect DB
     */
    await db_connection.connection.close().catch((error) => {
        console.log(error)
    });
    if (error)
        return error;
    return response;
};
