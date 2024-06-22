const mongoose = require('mongoose');

const Label = require('./Label');
const Artist = require('./Artist')
const User = require('./User')
const ProfileComment = require('./ProfileComments')


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

BandSchema.pre('deleteOne', async function (next) {

  console.log('hello from bandpredeleteone2')

  // const band = await this.model.findOne(this.getQuery());
  const idClear = this.getFilter()._id.toString()

  try {
    const updateComm = await ProfileComment.updateMany(
      {},
      { $pull: { comments: { authorId: idClear } } }).then(function(){
        ProfileComment.deleteOne({ profileId: idClear })
      }) 
    const updated = await Label.updateMany({}, {
      $pull: { attachedId: { $in: [idClear] } }
    })
    const updatedArtist = await Artist.updateMany({}, {
      $pull: { attachedId: { $in: [idClear] } }
    })
    if (updated && updated.acknowledged && updatedArtist.acknowledged && updateComm) {

      console.log(idClear.toString())

      next()
    }
  } catch (error) {
    console.log('eror clear from BAND', error)
    return error
  }

})

BandSchema.post('save', async function () {
  const thisuserId = this.userId
  User.findOneAndUpdate({ _id: thisuserId }, { itemId: this._id })
    .then(function () {
      User.findOne({ _id: thisuserId })
      // // .then(function (user) {
      // //     console.log('klk', thisuserId)
      // //     console.log('mere?', user)
      //  // })
    });

  // BandSchema.post('deleteOne',{ query: true, document: false }, async function () {
  //   const id = this.getFilter()._id.toString()
  //   console.log('trecut0', id)
  //   ProfileComment.findOne({ profileId: id }).then(function (profile) {
  //     if (profile) {
  //       ProfileComment.deleteOne({ profileId: id }).then(function(profile){
  //         console.log('trecut0', profile)
  //       })
  //       console.log('trecut0')
  //     }
  //   }
  //   )
  //   console.log('hello from bandpostdeleteone + id', id)

  // })

})


module.exports = mongoose.model('Band', BandSchema);

