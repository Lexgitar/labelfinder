const mongoose = require('mongoose');
//const User = require('./User')

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

// FanSchema.post('save', async function () {
//   const thisuserId = this.userId
//   User.findOneAndUpdate({ _id: thisuserId }, { itemId: this._id })
//   .then(function () {
//       User.findOne({ _id: thisuserId })
//      .then(function (user) {
//          console.log('klk', thisuserId)
//          console.log('mere?', user)
//      })
//   });
  
// })


module.exports = mongoose.model('Fan', FanSchema);