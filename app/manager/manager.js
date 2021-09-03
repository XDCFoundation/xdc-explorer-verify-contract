//const { lhtLog } = require("lh-utilities/utilityMethods");
var solc = require('solc');
const https = require('https')
//var fs = require('fs');
//const path = require('path');
//const fsPromises = require("fs").promises;
class BLManager {
    async VerifyContract(response) {
    	let data = JSON.parse(response)
    	//const inboxPath = path.resolve(__dirname, 'contract.sol');
    	if(data.action == 'compile'){
    		let version = data.version
    		let optimise = (data.optimise > 0)  ? true : false
    		let address = data.addr
    		let code = data.code.toString("utf8");
    		let name = data.contractname
    		var concatByteCode = "";
            var verifiedContracts = [];
            var soliCompCache = {};
            /*const { fd } = await fsPromises.open(inboxPath, "r");
		    fs.fchmod(fd, 0o777, err => {
		      if (err) throw err;
		      console.log("File permission change succcessful");
		    });
			fs.writeFile(inboxPath, code, 'utf8', function (err) {
			  if (err) console.log(err);
			  console.log('Hello World > helloworld.txt');
			});
			const source = fs.readFileSync(inboxPath, 'utf8');
			console.log('file contnent',source);*/
    		if(version == 'latest'){

    		}else{
    			try {
    				var url = 'https://binaries.soliditylang.org/bin/soljson-' + version + '.js';
				      https.get(url, function (response) {
				        if (response.statusCode !== 200) {
				          console.log('Error retrieving binary: ' + response.statusMessage)
				        } else {
				          console.log('not error')
				        }
				      }).on('error', function (error) {
				        console.log('Error is here====>',error)
				      });

    				await solc.loadRemoteVersion(version, function (err, solcV) { 
    					console.log('object====>',solcV)
	    				
	    				var output = solcV.compile(code, optimise);
	    				
	    				for (var contractName in output.contracts) {
			              concatByteCode += output.contracts[contractName].bytecode;
			              verifiedContracts.push({
			                "name": contractName,
			                "abi": output.contracts[contractName].interface,
			                "bytecode": output.contracts[contractName].bytecode
			              });
	            		}
    				});
    			}catch (e) {
    				console.log('error====>',e)
    			}
    			
    		}
    	}
    	
    	return verifiedContracts;
    }
}

module.exports = BLManager;
