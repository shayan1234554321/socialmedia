const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    email : {
        type: String,
        required : true ,
        unique: true 
    },
    userName : {
        type: String,
        required : true,
    },
    friends : {
        type:Array,
        default:[]
    },
    friendReq : {
        type:Array,
        default : []
    },
    profile : {
        type:String,
        default: 'defaultUserProfile.png'
    },
    cover : {
        type:String,
        default: 'defaultUserCover.jpg'
    },
    followers : {
        type:Array,
        default : []
    },
    location : {
        type:String,
        default: 'Not Specified'
    },
    notification : {
        type:Array ,
        default: []
    },
    gender : {
        type:String, 
        default: 'Male'
    },
    password : {
        type: String,
        required: true, 
    }
});

module.exports = mongoose.model('users' , userSchema);