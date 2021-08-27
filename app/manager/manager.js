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
    	const filePath = path.resolve(__dirname, 'mycontract.sol');
console.log('file path',filePath)
    	try {
		  const data = fs.writeFileSync(filePath, res.verifycode)
		  const contractFile = fs.readFileSync(filePath, 'UTF-8');
		  //file written successfully
		  var input = {
		    language: 'Solidity',
		    sources: {
		        'mycontract.sol': {content : contractFile}
		    },
		    settings: {
		        outputSelection: {
		            '*': {
		                '*': [ '*' ]
		            }
		        }
		    }
		};
		var output = JSON.parse(solc.compile(JSON.stringify(input)))
		for (var contractName in output.contracts['mycontract.sol']) {
    		console.log(contractName + ': ' + output.contracts['mycontract.sol'][contractName].evm.bytecode.object)
		}

		} catch (err) {
		  console.error(err)
		}
		return output;

    	// getting the development snapshot
    /*	solc.loadRemoteVersion(version, function (err, solcV) {
    		console.log(solcV)
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
        return targetSolc;*/
    }
}

module.exports = BLManager;
