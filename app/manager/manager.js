//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
var fs = require('fs');
const path = require('path');
const fsPromises = require("fs").promises;
class BLManager {
    async VerifyContract(response) {
    	let data = JSON.parse(response)
    	const inboxPath = path.resolve(__dirname, 'contract.sol');
    	if(data.action == 'compile'){
    		let version = data.version
    		let optimise = (data.optimise > 0)  ? 1 : 0
    		let address = data.addr
    		let code = data.code
    		let name = data.contractname
    		var concatByteCode = "";
            var verifiedContracts = [];
            var soliCompCache = {};
            const { fd } = await fsPromises.open(inboxPath, "r");
		    fs.fchmod(fd, 0o777, err => {
		      if (err) throw err;
		      console.log("File permission change succcessful");
		    });
			fs.writeFile(inboxPath, code, 'utf8', function (err) {
			  if (err) console.log(err);
			  console.log('Hello World > helloworld.txt');
			});
			const source = fs.readFileSync(inboxPath, 'utf8');
			console.log('file contnent',source);
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
    	
    	return verifiedContracts;
    }
}

module.exports = BLManager;
