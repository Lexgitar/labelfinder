const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LabelSchema = new Schema({
    name: {
        type: String,
        required: true
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
      }
})

module.exports = mongoose.model('Label', LabelSchema);