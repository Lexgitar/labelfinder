const mongoose = require('mongoose');
const {userInited} = require('../middleware/authMiddleware')

const Schema = mongoose.Schema;
const LabelSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
      },
    updatedAt: {
        type: Date,
        default: Date.now
      },
      attachedId:{
        type: []
    }
})



module.exports = mongoose.model('Label', LabelSchema);