//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');

class BLManager {
    async VerifyContract(data) {
    	let optimise = false
    	let version = '0.4.24'
    	var soliCompCache = {};
    	var output = null
    	let res = JSON.parse(data)
    	var targetSolc = soliCompCache[version];
        output = targetSolc.compile(res.verifycode, optimise);
        /*solc.loadRemoteVersion(version, function (err, solcV) {
          console.log("on loadRemoteVersion:" + version);
          if (err) {
            return err
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
             output = targetSolc.compile(res.verifycode, optimise);
           
          }
        });*/
        
        console.log('hello===>',res.verifycode)
        return output;
    }
}

module.exports = BLManager;
