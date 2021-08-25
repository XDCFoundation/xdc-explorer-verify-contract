/**
 * Created by Developer on 14/05/21.
 */

const yup = require("yup");
const UtilMethods = require("lh-utilities/utilityMethods")

module.exports = {
    validateRequest: async (requestData) => {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            password: yup.string().required()
        });
        await UtilMethods.validateData(schema, requestData);
    },
};
