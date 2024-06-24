const mongoose = require('mongoose');

////const User = require('./User')
const ProfileComment = require('./ProfileComments')

const Schema = mongoose.Schema;
const LabelSchema = new Schema({
  userId: {
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
  role: {
    type: String,
  },
  role: {
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



//LabelSchema.pre('deleteOne',{ query: true, document: false }, async function(){
LabelSchema.pre('deleteOne', async function () {
  const id = this.getFilter()._id.toString()
  // const profile = await ProfileComment.findOne({ profileId: id })
  // if (profile) {
    try {
      ProfileComment.updateMany(
        {},
        { $pull: { comments: { authorId: id } } }).then(function () {
          const delProfileComm =  ProfileComment.deleteOne({ profileId: id })
          return delProfileComm
        })
    } catch (error) {
      console.log('predel eror', error)
    }
    //let deleted = await ProfileComment.deleteOne({profileId:id})

    //console.log('trecut0', profile, deleted)
  //}
  console.log('hello from label predelete one + id:', id)
})

// LabelSchema.post('save', async function () {
//   const thisuserId = this.userId
//   User.findOneAndUpdate({ _id: thisuserId }, { itemId: this._id })
//     .then(function () {
//       User.findOne({ _id: thisuserId })
//       // // .then(function (user) {
//       // //     console.log('klk', thisuserId)
//       // //     console.log('mere?', user)
//       //  // })
//     });


// })


module.exports = mongoose.model('Label', LabelSchema);