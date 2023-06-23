const mongoose = require('mongoose');

const conv = mongoose.Schema({
    ids : {
        type : Array ,
        require : true
    }
},{timestamps: true})

module.exports = mongoose.model('conv' , conv) ;