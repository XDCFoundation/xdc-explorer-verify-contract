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
		var output = solc.compile(JSON.stringify(input))
		for (var contractName in output.contracts['contract.sol']) {
    		console.log(contractName + ': ' + output.contracts['contract.sol'][contractName].evm.bytecode.object)
		}

		} catch (err) {
		  console.error(err)
		}
		return output;
    }
}

module.exports = BLManager;
