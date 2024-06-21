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

ProfileCommentsSchema.pre('deleteOne', async function(){
    console.log('ried from schema')
    try {
        this.updateMany(
            // {comments:{authorId:this.profileId}},
            {},
             {$pull:{comments:{authorId:this.profileId}}})
        console.log('trecut')
    } catch (error) {
        console.log('many eror')
        return error
    }
})

module.exports = mongoose.model('ProfileComment', ProfileCommentsSchema)