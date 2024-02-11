const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const Band = require('./Band')
const Label = require('./Label')
const Fan = require('./Fan')
//const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Min pass length is 6 chars']
    },
    role: {
        type: String,
        required: [true, 'Please define role'],
        enum: ['label', 'band', 'fan'],
        description: 'Must choose between label, band or fan'
    },
    inited: {
        type: Boolean
    },
    itemId: {
        type: String
    }

});

//before doc saved
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    console.log('cheeki')
    next()
})

UserSchema.pre('deleteOne', async function (next) {
    const role = this.getFilter().role
    const myUserId = this.getFilter()._id

    const modelToDelete = (role === 'band' ? Band : (role === 'label' ? Label : Fan))
    //console.log('anteDel-model', modelToDelete, role, myUserId)
    const foundModel = await modelToDelete.findOne({ userId: myUserId })

    if (foundModel) {

        console.log(foundModel)
        if (modelToDelete === Label) {
            console.log('model2del', modelToDelete)
            try {

                const updated = await Band.updateMany({}, {
                    $pull: { attachedId: { $in: [foundModel._id.toString()] } }
                })
                if (updated && updated.acknowledged) {

                    console.log('founmodel id', foundModel._id)
                    console.log('founmodel id str', foundModel._id.toString())
                    const deletedModel = await modelToDelete.deleteOne({ _id: foundModel._id })
                    if (deletedModel) {

                        console.log('dlmodel joist', deletedModel)
                        try {
                            next()
                        } catch (error) {
                            return error
                        }
                    }
                    
                }
            } catch (error) {
                console.log('label eror clear')
                return error
            }
        }else{
            const deletedModel = await modelToDelete.deleteOne({ _id: foundModel._id })
        if (deletedModel) {
            console.log('foundmodle', foundModel)
            console.log('dlmodel', deletedModel)
            try {
                next()
            } catch (error) {
                return error
            }
        }
        }
        
    } else {
        console.log(foundModel)
        next()
    }
})
//static method to ligin user
UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports = mongoose.model('User', UserSchema);