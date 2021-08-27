//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
const fs = require('fs');
const path = require('path');
class BLManager {
    async VerifyContract(data) {
    	let optimise = false
    	let version = 'v0.4.24+commit.e67f0147'
    	var soliCompCache = {};
    	var output = null
    	let res = JSON.parse(data)
    	var targetSolc = soliCompCache[version];
    	try {
    		const inboxPath = path.resolve(__dirname, 'contract.sol');
			const source = fs.readFileSync(inboxPath, 'utf8').toString();


    		solc.loadRemoteVersion(version, function (err, solcV) {
    		console.log(solcV)
          	console.log("on loadRemoteVersion:" + version);
          if (err) {
            console.error('Error==>',err);
            
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
             output = targetSolc.compile(res.verifycode, optimise);
            console.error('output==>',output);
          }
        });


		} catch (err) {
		  console.error(err)
		}
		return output;
    }
}

module.exports = BLManager;
