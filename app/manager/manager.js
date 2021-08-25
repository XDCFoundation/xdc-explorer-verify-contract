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
		solc.loadRemoteVersion('latest', function(err, solcSnapshot) {
		  if (err) {
		    // An error was encountered, display and quit
		  } else {
		  	console.log('hello===>',solcSnapshot)
		    // NOTE: Use `solcSnapshot` here with the same interface `solc` has
		  }
		});
        
        console.log('hello===>',res.verifycode)
        return linkReferences;
    }
}

module.exports = BLManager;
