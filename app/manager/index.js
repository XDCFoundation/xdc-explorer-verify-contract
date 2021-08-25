/**
 * Created by Developer on 13/05/21.
 */
const moment = require("moment");
const Config = require("../../config");
const BlManager = require("./manager");
const { lhtLog, structuredResponse, parseResponse, } = require("lh-utilities/utilityMethods");
const { httpConstants, apiSuccessMessage, apiFailureMessage, } = require("../common/constants");

class Manger {
    async getVerifyContract(req) {
        lhtLog("Manager:getVerifyContract", "getVerifyContract started", Config.IS_CONSOLE_LOG, "");
        
        let [error, response] = await parseResponse(
            new BlManager().VerifyContract(req)
        );
        if (error) {
            lhtLog("Manager:getVerifyContract", "getVerifyContract end", error, "", "ERROR");
            throw structuredResponse(error, error.message || apiFailureMessage.FETCH_FAIL, httpConstants.RESPONSE_STATUS.FAILURE, httpConstants.RESPONSE_CODES.FORBIDDEN);
        }
        return structuredResponse(response, apiSuccessMessage.SEARCH_SUCCESSFULL, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK);
    }
}

module.exports = Manger;
