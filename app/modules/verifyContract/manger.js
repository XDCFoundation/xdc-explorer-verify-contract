const mongoose = require('mongoose')
const { verifier } = require('./contractVerifyer');
import Config from "../../../config"
export default class Manger {
  verifyContract = async (requestData) => {
    var data = {}
    const CONTRACT_FILE = 'contract.sol'    
    let provider = Config.PROVIDER_URL
    var settings = {
      'solc_version': requestData.version,
      'file_name': CONTRACT_FILE,
      'contract_name': requestData.contractname ? requestData.contractname : CONTRACT_FILE.slice(0, -4),
      'contract_address': requestData.addr,
      'is_optimized': requestData.optimise ? 1 : 0,
      'sourse_code': requestData.code
    }

    let response = await verifier(settings, provider);
    return response;
  }
}
