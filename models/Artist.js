const mongoose = require('mongoose')

//const User = require('./User')

const Schema = mongoose.Schema
const ArtistSchema = new Schema({
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

// ArtistSchema.post('save', async function () {
//     const thisuserId = this.userId
//     User.findOneAndUpdate({ _id: thisuserId }, { itemId: this._id })
//     .then(function () {
//         User.findOne({ _id: thisuserId })
//        .then(function (user) {
//            console.log('klk', thisuserId)
//            console.log('mere?', user)
//        })
//     });
    
// })

module.exports = mongoose.model('Artist', ArtistSchema)

