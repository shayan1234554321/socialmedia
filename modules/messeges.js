const mongoose = require('mongoose')

const Messeges = mongoose.Schema({
    convId: {
        type: String ,
        required: true
    },
    senderId: {
        type: String ,
        required: true
    },
    msg: {
        type: String ,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('messeges' , Messeges);