const mongoose = require('mongoose')
var solc = require('solc');
export default class Manger {
    verifyContract = async (requestData) => {
        var data = {}
        const CONTRACT_FILE = 'contract.sol'
        var optimise = requestData.optimise;
        var soliCompCache = {};
        let version = requestData.version
        var input = {
          language: 'Solidity',
          sources: {
            [CONTRACT_FILE]: {
              content: requestData.code
            }
          },
          settings: {
            "outputSelection": {
              "*": {
                "*": [
                  "metadata", "evm.bytecode" // Enable the metadata and bytecode outputs of every single contract.
                  , "evm.bytecode.sourceMap" // Enable the source map output of every single contract.
                ],
                "": [
                  "ast" // Enable the AST output of every single file.
                ]
              },
              // Enable the abi and opcodes output of MyContract defined in file def.
              "": {
                CONTRACT_FILE: [ "abi", "evm.bytecode.opcodes" ]
              }
            }
           /* outputSelection: {
              '*': {
                '*': ['*']
              }
            }*/
          }
        }
      var verifiedContracts = [];
      var concatByteCode = "";
      if (version == 'latest') {
        try {
          var output = JSON.parse(solc.compile(JSON.stringify(input), optimise));
          console.log('output===>',output)
          if (JSON.stringify(output.sources) != '{}') {
            for (const contractName in output.contracts[CONTRACT_FILE]) {
                verifiedContracts.push({
                  "name": contractName,
                  "bytecode": output.contracts[CONTRACT_FILE][contractName].evm.bytecode.object
                });
            }
          } else {
            console.log('Error===>',output.errors[0].message)
          }
          
        } catch (err) {
          console.log('Error===>',err)
        }
        console.log('latest=====>',verifiedContracts)
      } else {
        try {
              solc.loadRemoteVersion(version, function (err, solcV) {  
                var output = JSON.parse(solcV.compile(JSON.stringify(input), optimise));
                console.log('output===>',JSON.stringify(output))
                if (JSON.stringify(output.sources) != '{}') { 
                  for (const contractName in output.contracts[CONTRACT_FILE]) {                    
                    verifiedContracts.push({
                      "name": contractName,
                      "abi": output.contracts[CONTRACT_FILE][contractName].evm.interface,
                      "bytecode": output.contracts[CONTRACT_FILE][contractName].evm.bytecode.object
                    });
                    
                  }
                }
              
              //console.log(verifiedContracts)
          });
        } catch (err) {
          console.log('Error===>',err)
        }
        
      }
        return verifiedContracts
    }    
}
