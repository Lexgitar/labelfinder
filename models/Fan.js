const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FanSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
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

module.exports = mongoose.model('Fan', FanSchema);