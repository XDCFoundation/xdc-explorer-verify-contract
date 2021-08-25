//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');

class BLManager {
    async VerifyContract(data) {
    	let optimise = true
        var output = solc.compile(data.code, optimise);
        console.log(output)
        return output;
    }
}

module.exports = BLManager;
