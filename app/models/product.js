import {genericConstants} from "../common/constants";

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName: {type: String, default: ""},
    brand: {type: String, default: ""},
    advertiserId:{type: String, default: ""},
    description: {type: String, default: ""},
    superCategory: {type: String, default: ""},
    category: {type: String, default: ""},
    keyWords: {type: Array, default: []},
    rate: {type: String, default: ""},
    subCategory: {
        _id: {type: String, default: ""},
        name: {type: String, default: ""},
    },
    status: {
        type: String,
        default: genericConstants.productStatus.ACTIVE,
        enum: [
            genericConstants.productStatus.ACTIVE,
            genericConstants.productStatus.INACTIVE,
        ],
    },
    mediaUrl: { type: String, default: "" },
    mediaName: { type: String, default: "" },
    isAdsOn: { type: Boolean, default: true },
    totalImpression: { type: Number, default: 0 },
    addedOn: {type: Number, default: Date.now()},
    addedBy: {type: String, default: ""},
    modifiedOn: {type: Number, default: Date.now()},
    modifiedBy: {type: String, default: ""},
});

productSchema.method({
    saveObj: async function () {
        return this.save();
    },
});
productSchema.static({
    getDocuments: function (requestData, selectionKeys, offset, limit, sortingKey) {
        return this.find(requestData, selectionKeys).sort(sortingKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },
    findObj: function (findObj) {
        return this.find(findObj);
    },
    findOneObj: function (findObj) {
        return this.findOne(findObj);
    },
    findOneAndUpdateObj: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
        });
    },
    countObj: function (findObj) {
        return this.count(findObj);
    },
    findObjWithAggregate: function (findObj) {
        return this.aggregate(findObj);
    },
});
export default mongoose.model("product", productSchema);
