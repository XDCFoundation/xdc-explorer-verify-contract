//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
class BLManager {
    async VerifyContract(response) {
    	let data = JSON.parse(response)
    	
    	if(data.action == 'compile'){
    		let version = data.version
    		let optimise = (data.optimise > 0)  ? 1 : 0
    		let address = data.addr
    		let code = data.code
    		let name = data.contractname
    		var concatByteCode = "";
            var verifiedContracts = [];
            var soliCompCache = {};
console.log('object====>',optimise)
    		if(version == 'latest'){

    		}else{
    			console.log('====>')
    			solc.loadRemoteVersion(version, function (err, solcV) {
    				targetSolc = solcV;
            		soliCompCache[version] = targetSolc;//compiler cache
    				var output = targetSolc.compile(code, optimise);
    				console.log('object====>',err)
    				for (var contractName in output.contracts) {
		              concatByteCode += output.contracts[contractName].bytecode;
		              verifiedContracts.push({
		                "name": contractName,
		                "abi": output.contracts[contractName].interface,
		                "bytecode": output.contracts[contractName].bytecode
		              });
            		}
    			});
    		}
    	}
    	console.log('params====>',verifiedContracts)
    	return verifiedContracts;
    }
}

module.exports = BLManager;
