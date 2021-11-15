const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
  name: { type: String, default: '' },
  isSubCategory: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  addedOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() }
})

subCategorySchema.method({
  saveData: async function () {
    return this.save()
  }
})
subCategorySchema.static({
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
export default mongoose.model('ps-categories', subCategorySchema)
