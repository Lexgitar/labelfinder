const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ProfileCommentsSchema = new Schema({
    profileId: {
        type: String,
        required: true,
        unique: true
    },
    comments: [
        
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('ProfileComment', ProfileCommentsSchema)