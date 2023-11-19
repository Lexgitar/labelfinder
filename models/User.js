const mongoose = require('mongoose');
const {isEmail} = require ('validator');
const bcrypt = require('bcrypt');
//const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate:[isEmail, 'enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Min pass length is 6 chars']
    },
    role:{
        type: String,
        required:[true, 'Please define role'],
        enum: ['label', 'band', 'fan'],
        description: 'Must choose between label, band or fan'
    },
    inited:{
        type: Boolean
    },
    itemId:{
        type: String
    }
    
});

//before doc saved
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
//static method to ligin user
UserSchema.statics.login = async function(email, password){
    const user  = await this.findOne({email});
    if (user){
     const auth = await bcrypt.compare(password, user.password)
     if(auth){
        return user
     }
     throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

module.exports = mongoose.model('User', UserSchema);