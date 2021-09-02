//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
const fs = require('fs');
const path = require('path');
class BLManager {
    async VerifyContract(data) {
    	console.log('params====>',data)
    	return data;
    }
}

module.exports = BLManager;
