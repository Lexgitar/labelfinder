const mongoose = require('mongoose')

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

module.exports = mongoose.model('Artist', ArtistSchema)