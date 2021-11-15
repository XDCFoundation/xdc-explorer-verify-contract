/**
 * Created by Alok on 09/11/21.
 */
import * as ValidationManger from "../middleware/validation";
import VerifyContractModule from "../app/modules/verifyContract";
import {stringConstants} from "../app/common/constants";


module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));    
    /**
     * route definition
     */
    
    app.post("/verify-contract", 
    ValidationManger.VerifyContract, 
    new VerifyContractModule().VerifyContract);  
    
};
