const mongoose = require('mongoose') ;

const Post = mongoose.Schema({
    title: {
        required: true ,
        type: String ,
    },
    desc: {
        type:String,
    },
    img: {
        type:String,
        default: ''
    },
    likes: {
        type: Array,
        default:[]
    },
    location: {
        type: String
    },
    userId: {
        type:String,
        required:true
    },
},{timestamps: true});

module.exports =  mongoose.model('posts', Post);

