const app = require('express').Router();
const User = require('../modules/users');
const Post = require('../modules/post')
const multer = require('multer');
const { updateOne } = require('../modules/users');



const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./images");
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name);
    },
});

const upload = multer({ storage : storage});


// -------------- Find user by params

app.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json("not found");
        console.log(err);
    }
})

// --------------- Update cover picture

app.post('/coverPic' , upload.single('file'), async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await user.updateOne({$set: {cover: req.body.name} }) ;

        res.status(200).json('Cover Updated')

    }catch(err){
        res.status(500).json(err)
    }
})

// ---------------- Update profile Pic

app.post('/profilePic' , upload.single('file'), async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        await user.updateOne({$set: {profile: req.body.name} }) ;
        res.status(200).json('Profile Updated')

    }catch(err){
        res.status(500).json(err)
    }
})

// -----------------Add to friends
app.post('/addToFriends/:id', async (req,res)=> {
    try{
        // const user = await User.findById(req.params.id);
        const anotherUser = await User.findById(req.body.usersId)
    
        if(!anotherUser.friends.includes(req.params.id) && !anotherUser.friendReq.includes(req.params.id) ){
            await anotherUser.updateOne({ $push: {friendReq : req.params.id} })
            if(!anotherUser.followers.includes(req.params.id)){
                await anotherUser.updateOne({ $push: {followers : req.params.id} })
            }
            res.status(200).json('req sent')
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Follow unfollow user

app.post('/follow/:id' , async(req,res) => {
    try{
        const anotherUser = await User.findById(req.body.usersId);
        if(!anotherUser.followers.includes(req.params.id)){
            await anotherUser.updateOne({ $push: { followers : req.params.id } })
            res.status(200).json('Followed')
        }else {
            await anotherUser.updateOne({ $pull: { followers: req.params.id } })
            res.status(200).json('unFollowed')
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//Update information of user

app.post('/updateInfo/:id', async(req,res)=>{
    const user = await User.findById(req.params.id)
    await user.updateOne({location : req.body.changeCountry});
    await user.updateOne({gender: req.body.changeGender});
    await user.updateOne({userName : req.body.changeUserName})
    res.status(200).json('Updated')
})

// Get profile posts

app.post('/getPosts', async (req,res)=>{
    try{
        const user = await req.body.usersId ;
        const posts = await Post.find({ userId: user });
        console.log(posts.data)
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
})

//Remove From Friends

app.post('/removeFromFriends/:id' , async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        const anotherUser = await User.findById(req.body.usersId);

        await user.updateOne({$pull: {friends: req.body.usersId }});
        await anotherUser.updateOne({ $pull: {friends: req.params.id } });
        res.status(200).json('Removed')
    }catch(err){
        res.status(500).json(err)
    }
})

//Cancel Friend Request

app.post('/cancelFriendReq/:id' , async (req,res)=>{
    try{
        const anotherUser = await User.findById(req.body.usersId);
        await anotherUser.updateOne({$pull: {friendReq: req.params.id } })
        res.status(200).json('Removed')
    }catch(err){
        res.status(200).json(err)
    }
})

//Accept Friend request 
app.post('/accept/:id' , async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const anotherUser = await User.findById(req.body.usersId);
        console.log(req.params.id)
        console.log(req.body.usersId)
        await anotherUser.updateOne({$pull: {friendReq: req.body.usersId }});
        await anotherUser.updateOne({$pull: {friendReq: req.params.id }});
        await user.updateOne({$push: {friends: req.body.usersId }});
        await anotherUser.updateOne({ $push: {friends: req.params.id }});
        res.status(200).json('Accepted')
    }catch(err){
        res.status(200).json(err)
    }
})

module.exports = (app);