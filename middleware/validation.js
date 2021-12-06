import Utils from "../app/utils";
import * as yup from "yup";

module.exports = {
  VerifyContract: async (req, res, next) => {
    const schema = yup.object().shape({
      addr: yup.string().required(),
      contractname: yup.string().required(),
      version: yup.string().required(),
      code: yup.string().required()
    });
    await validate(schema, req.body, res, next);
  },
  
};



const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    Utils.responseForValidation(res, errors);
  }
};
