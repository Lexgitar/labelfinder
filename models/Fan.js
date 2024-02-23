const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FanSchema = new Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
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
      attachedId:{
        type: String
      }
})

module.exports = mongoose.model('Fan', FanSchema);