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

// ProfileCommentsSchema.pre('deleteOne', async function () {
//     const id = await this.getFilter().profileId.toString()
//     console.log('ried from schema, id:', id)
//     try {
//         let many = await this.updateMany(
//             {},
//             { $pull: { comments: { authorId: id } } })
//         //{$pull:{comments:{authorId: id}}})
//         console.log('trecut', many)
//     } catch (error) {
//         console.log('many eror', error)
//         return error
//     }
// })

module.exports = mongoose.model('ProfileComment', ProfileCommentsSchema)