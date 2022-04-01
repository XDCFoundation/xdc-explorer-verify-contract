const solc = require('solc');
const Web3 = require('web3');
const fs = require('fs');
const chalk = require('chalk');
import WebSocketService from './WebsocketService';
import ContractModel from "../../models/Contract";
/*
  Function [verifier]
*/
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

module.exports.verifier = async (settings, provider) => {
    var web3 =  await WebSocketService.webSocketConnection(provider);
    let solc_version = settings['solc_version'];
    let file_name = settings['file_name'];
    let contract_name = settings['contract_name'];
    let contract_address = settings['contract_address'];
    let is_optimized = settings['is_optimized'];
	let sourse_code = settings['sourse_code'];
	const responseStatus = []
    var input = sourse_code;
    var bytecode_from_compiler;
	var bytecode_from_blockchain;
	var output;
	var bytecode;

	var input_json = {
				language: "Solidity",
					sources: 
						{file: {"content": input} },
					settings: {
						optimizer: {
						// disabled by default
							enabled: is_optimized,
							runs: 200
						},
						outputSelection: {
							"*": {
									"*": [ "*" ]
								}
							}
						}							
				}
	if (solc_version === 'latest') {
			
				
				// if solc successfully loaded, compile the contract and get the JSON output
				 output = JSON.parse(solc.compile(JSON.stringify(input_json)), is_optimized);
				try {         
					// single contract
					bytecode = output.contracts["file"][contract_name]['evm']['deployedBytecode']['object']
					bytecode_process(bytecode , output)
					
				} catch (err) {
					responseStatus.push({
						"Error": 1,
						"data": null,
						"message": "Please Enter Valid Data",
					})
				}
		
		
	} else {
		let result = await loadSolcRemoteVersion(solc_version)
		
	}

  
	async function loadSolcRemoteVersion(version) {
		if (!version) return;
		return new Promise((resolve, reject) => {
			 solc.loadRemoteVersion(version, function(err, solc_specific){
				 if (err) {
					
						resolve();
				}
				try {  
					output = JSON.parse(solc_specific.compile(JSON.stringify(input_json)),is_optimized);
					// single contract
					if (typeof output.errors == 'undefined') { 
						bytecode = output.contracts["file"][contract_name]['evm']['deployedBytecode']['object']
						resolve(bytecode_process(bytecode , output))	
					} else { 
						responseStatus.push({
							"Error": 1,
							"data": null,
							"message": "Bytecode doesn't match!!.",
						})
						resolve(responseStatus);
					}
					
					
				} catch (err) { 
					responseStatus.push({
							"Error": 1,
							"data": null,
							"message": "Bytecode doesn't match!!.",
						})
				}
			});
		})
	}

	async function bytecode_process(bytecode , data) {
		// get bytecode from JSON output
		let solc_minor = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1))
		let solc_patch = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1))
		if ((solc_minor >= 4) && (solc_patch >= 7)){
      

		if (solc_minor >= 4 && solc_patch >= 22) {
			var starting_point = bytecode.lastIndexOf('6080604052');

		} else if (solc_patch < 4 && solc_patch >= 7) {
			var starting_point = bytecode.lastIndexOf('6060604052');
		}
			var ending_point = bytecode.search('a165627a7a72305820');
			bytecode_from_compiler = '0x' + bytecode.slice(starting_point, ending_point);
			
			await verify_with_blockchain(solc_version , data);
    	}
		else{
			bytecode_from_compiler = '0x'+bytecode;
			await verify_with_blockchain(solc_version , data);
		}
  }

  async function verify_with_blockchain(solc_version , data){ 
  	// using web3 getCode function to read from blockchain
	 await web3.eth.getCode(contract_address,async function(error, output)
	  {
		 let jsonParseData = JSON.parse(data.contracts["file"][contract_name]['metadata'])
		  let abicode = JSON.stringify(jsonParseData.output.abi)
		  let contractAddress=contract_address.replace(/^.{2}/g, 'xdc');
		  if(!error) {
			if (parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1)) >= 4
				  && parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1)) >= 7) {
          
				  var ending_point = output.search('a165627a7a72305820');
				  var swarm_hash_full = output.slice(output.lastIndexOf("a165627a7a72305820"), -4);
				  var swarm_hash = swarm_hash_full.slice(18);
				  bytecode_from_blockchain = output.slice(0, ending_point);
				if (bytecode_from_blockchain === bytecode_from_compiler) {
					//  ContractModel.updateContract({
					// 	address: contractAddress,
					// },{
					// 	compilerVersion: solc_version,
					// 	sourceCode: sourse_code,
					// 	abi: abicode,
					// 	byteCode: bytecode_from_blockchain,
					// });
					let upsertDoc = {
						updateOne: {
							filter: {
								address: contractAddress
							},
							update: {
								compilerVersion: solc_version,
								sourceCode: sourse_code,
								abi: abicode,
								byteCode: bytecode_from_blockchain
							},
							upsert: true,
						},
					};
					ContractModel.bulkUpsert([upsertDoc]);
					  responseStatus.push({
						  "Error": 0,
						  "data": data,
						  "message": "Bytecode Verified!!",
					  })
				  }
				  else {
					  responseStatus.push({
						  "Error": 1,
						  "data": null,
						  "message": "Bytecode doesn't match!!",
					  })
				  }
			  }
			  // if the solc version is less than 0.4.7, then just directly compared the two.
			  else {
				bytecode_from_blockchain = output;
				if (bytecode_from_blockchain === bytecode_from_compiler) {

					//  ContractModel.updateContract({
					// 	address: contractAddress,
					// },{
					// 	compilerVersion: solc_version,
					// 	sourceCode: sourse_code,
					// 	abi: abicode,
					// 	byteCode: bytecode_from_blockchain,
					// });
					let upsertDoc = {
						updateOne: {
							filter: {
								address: contractAddress
							},
							update: {
								compilerVersion: solc_version,
								sourceCode: sourse_code,
								abi: abicode,
								byteCode: bytecode_from_blockchain
							},
							upsert: true,
						},
					};
					ContractModel.bulkUpsert([upsertDoc]);

					  responseStatus.push({
						  "Error": 0,
						  "data": data,
						  "message": "Bytecode Verified!!",
					  })
				  }
				  else {
					  responseStatus.push({
						  "Error": 1,
						  "data": null,
						  "message": "Bytecode doesn't match!!",
					  })
				  }
			  }
		  } else { 
			  responseStatus.push({
				"Error": 1,
				"data": null,
				"message": error.message,
			})
			}
			  
		});
	  
  }
  return responseStatus;
};

//module.exports = {verifier};