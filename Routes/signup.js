const app = require('express').Router();
const User = require('../modules/users');

app.post('/' , async (req,res) => {
    
    const newUser = new User({
        userName : req.body.userName,
        email : req.body.email,
        password : req.body.password
    });
    
    try{
        const user = await newUser.save();
        console.log(user);
        res.status(200).json(user);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = (app);