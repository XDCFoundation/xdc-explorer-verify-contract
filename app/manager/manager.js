//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
class BLManager {
    async VerifyContract(data) {
    	let optimise = false
    	let version = 'v0.4.24+commit.e67f0147'
    	var soliCompCache = {};
    	var output = null
    	let res = JSON.parse(data)
    	var targetSolc = soliCompCache[version];
    	// getting the development snapshot
    	solc.loadRemoteVersion(version, function (err, solcV) {
          console.log("on loadRemoteVersion:" + version);
          if (err) {
            console.error(err);
            
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
             output = targetSolc.compile(res.verifycode, optimise);
            
          }
        });
		//output = JSON.parse(solc.compile(JSON.stringify(res.verifycode)));
        
        //console.log('hello===>',res.verifycode)
        return output;
    }
}

module.exports = BLManager;
