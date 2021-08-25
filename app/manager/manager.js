//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');

class BLManager {
    async VerifyContract(data) {
    	let optimise = false
    	let version = '0.4.24'
    	var soliCompCache = {};
    	var output = null
        //var output = solc.compile(data.code, optimise);
        solc.loadRemoteVersion(version, function (err, solcV) {
          console.log("on loadRemoteVersion:" + version);
          if (err) {
            return err
          }
          else {
            targetSolc = solcV;
            soliCompCache[version] = targetSolc;//compiler cache
             output = targetSolc.compile(data.code, optimise);
            return output
          }
        });
        console.log('hello===>',data.code)
        return output;
    }
}

module.exports = BLManager;
