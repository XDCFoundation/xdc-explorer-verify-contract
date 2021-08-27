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


    		var input = {
		    language: 'Solidity',
		    sources: {
		        'contract.sol': {content : source}
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
		console.log('output here===>',output)
		for (var contractName in output.contracts['ABC.sol']) {
    		console.log(contractName + ': ' + output.contracts['ABC.sol'][contractName].evm.bytecode.object)
		}

		} catch (err) {
		  console.error(err)
		}
		return output;
    }
}

module.exports = BLManager;
