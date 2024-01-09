const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BandSchema = new Schema({
    userId:{
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
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      attachedId:{
        type: []
      }
})

module.exports = mongoose.model('Band', BandSchema);