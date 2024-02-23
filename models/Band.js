const mongoose = require('mongoose');
const Label = require('./Label');

const Schema = mongoose.Schema;
const BandSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    // unique: true
  },
  location: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    
  },
  about: {
    type: String,
    
  },
  links: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  attachedId: []
})

BandSchema.pre('deleteOne', async function (next) {

  const band = await this.model.findOne(this.getQuery());
  const idClear = this.getFilter()._id.toString()

  try {

    const updated = await Label.updateMany({}, {
      $pull: { attachedId: { $in: [idClear] } }
    })
    if (updated && updated.acknowledged) {

      console.log(idClear.toString())

      next()
    }
  } catch (error) {
    console.log('eror clear')
    return error
  }

})

module.exports = mongoose.model('Band', BandSchema);

