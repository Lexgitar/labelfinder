const mongoose = require('mongoose')

const Schema = mongoose.Schema
const CommentsBodySchema = new Schema({
    body: {
        type: String,
        required: true
        
    },
    authorId: {
        type: String,
        required: true
        //maybe toString when working
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

module.exports = mongoose.model('CommentsBody', CommentsBodySchema)