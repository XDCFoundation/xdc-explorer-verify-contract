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

    //let provider = "wss://ws.xinfin.network"
    let provider = "wss://LeewayHertzXDCWS.BlocksScan.io"
    var settings = {
      'solc_version': requestData.version,
      'file_name': CONTRACT_FILE,
      'contract_name': requestData.contractname ? requestData.contractname : CONTRACT_FILE.slice(0, -4),
      'contract_address': requestData.addr,
      'is_optimized': requestData.optimise ? 1 : 0,
      'sourse_code': requestData.code
    }

    let response = await verifier(settings, provider);
console.log('responsehere=====',response)
    return response;
  }
}
