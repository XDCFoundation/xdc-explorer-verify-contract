const mongoose = require('mongoose')
const {verifier} = require('./contractVerifyer');
export default class Manger {
  verifyContract = async (requestData) => {
    var data = {}
    const CONTRACT_FILE = 'contract.sol'
    var optimise = requestData.optimise;
    var soliCompCache = {};
    let version = requestData.version
    let contract_Name = requestData.contractname
    let contractAddress = requestData.addr

    let provider = "wss://ws.xinfin.network"
    //let provider = "wss://ws.apothem.network"
    var settings = {
      'solc_version': requestData.version,
      'file_name': CONTRACT_FILE,
      'contract_name': requestData.contractname ? requestData.contractname : CONTRACT_FILE.slice(0, -4),
      'contract_address': requestData.addr,
      'is_optimized': requestData.optimise ? 1 : 0,
      'sourse_code': requestData.code
    }

    let response = verifier(settings, provider);

    return response;



      
    /* var input = {
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
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
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
      solc.loadRemoteVersion(version, async function (err, solcV) {
        if (!err) {

          web3.eth.getCode(contractAddress, function(error, result) {
            if(!error) {
                console.log(result);
            } else {
              console.log(error)
            }
          });
          
          
          
          var output = JSON.parse(solcV.compile(JSON.stringify(input), optimise));
          //var compiled_bytecode = "0x" + output['contracts'][contract_Name]['runtimeBytecode'];
          
           // if (JSON.stringify(output.sources) != '{}') { 
           for (const contractName in output.contracts[CONTRACT_FILE]) {
            var compiled_bytecode = "0x" + output.contracts[CONTRACT_FILE][contract_Name].evm.bytecode.object;

                console.log('compiled_bytecode====>',compiled_bytecode)
                 verifiedContracts.push({
                  "name": contractName,
                  "abi": output.contracts[CONTRACT_FILE][contract_Name].evm.interface,
                  "bytecode": output.contracts[CONTRACT_FILE][contract_Name].evm.bytecode.object
                }); 
                
              } 
            //}  
        } else {
          console.log('Error===>',err)
        }
        console.log(verifiedContracts)
      });
    } catch (err) {
      console.log('Error===>',err)
    }
    
  }
    return verifiedContracts
}  */
  }
}
