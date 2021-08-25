//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
class BLManager {
    async VerifyContract(data) {
    	let optimise = false
    	let version = '0.4.24'
    	var soliCompCache = {};
    	var output = null
    	let res = JSON.parse(data)
    	// getting the development snapshot
		output = JSON.parse(solc.compile(JSON.stringify(res.verifycode)));
        
        console.log('hello===>',res.verifycode)
        return output;
    }
}

module.exports = BLManager;
