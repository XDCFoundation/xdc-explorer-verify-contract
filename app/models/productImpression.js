const mongoose = require('mongoose')
var Schema = mongoose.Schema;
const SchemaObj = new Schema({
  hospital:{type: Schema.Types.ObjectId, ref: "hospital"},
  product:{type: Schema.Types.ObjectId, ref: "product"},
  totalImpression: { type: Number, default: 0 },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() }
})

SchemaObj.method({
  saveData: async function () {
    return this.save()
  }
})
SchemaObj.static({
  findData: function (findObj) {
    return this.find(findObj)
  },
  findOneData: function (findObj) {
    return this.findOne(findObj)
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    })
  },
  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj)
  }
})
export default mongoose.model('product-impression', SchemaObj)
