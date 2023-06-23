const app = require('express').Router();
const User = require('../modules/users');


app.post('/' , async (req,res) => {
    try{
        
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json("wrong credentials");
        }
        const password = await (user.password === req.body.password);
        if(!password){
            return res.status(400).json('wrong credentials');
        }

        res.status(200).json(user);
        console.log('found and signed in');
        console.log(user);

    }catch(err) {
        console.log(err);
        return res.status(400).json("error");
    }
});



module.exports = (app);