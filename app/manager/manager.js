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

    	try {


    		fs.open(filePath, 'w', function(err, fd) {
			    if (err) {
			        throw 'could not open file: ' + err;
			    }

			    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
			    fs.write(fd, res.verifycode, 0, res.verifycode.length, null, function(err) {
			        if (err) throw 'error writing file: ' + err;
			        fs.close(fd, function() {
			            console.log('wrote the file successfully');
			        });
			    });
			});


		  //const data = fs.writeFileSync(filePath, res.verifycode)
		  //console.log('file data',data)
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
