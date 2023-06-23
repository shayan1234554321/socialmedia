const app = require('express').Router();
const User = require('../modules/users');
const Post = require('../modules/post');
const multer = require('multer');


// const fileName 
//Setting up multer

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./images");
    },
    filename: (req,file,cb) => {
        cb(null,req.body.name);
    },
});

const upload = multer({ storage : storage});

// Get timeline posts

app.post('/posts', async (req,res) => {
    if(req.body.userId !== undefined ){
        try {
            const user = await User.findById(req.body.userId);
            const posts = await Post.find({userId : req.body.userId});
            const friendPosts = await Promise.all(user?.friends?.map((friends) => { return Post.find({userId : friends})  }) )
            const allPosts = posts.concat(...friendPosts)
            res.status(200).json( allPosts);

    
        }catch(err){
            res.status(500).json(err);
        }
    }
});


//Post

app.post('/', upload.single('file'), async (req,res) => {
    
     try {
        const post = new Post({
        userId : req.body.userId,
        title: req.body.title,
        desc: req.body.desc,
        img : req.body.name
        });

        post.save();
        res.status(200).json("Posted");

    }catch(err){
        res.status(500).json(err);
    }
})



app.post('/getPostUser', async (req , res) => {

    try{
        const user = await User.findById( req.body.userId );
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }


})

//UPdate like/unlike

app.put('/updateLikes', async (req,res) => {
    try{
        const post = await Post.findById(req.body.postId);
        if(post.likes.includes(req.body.currentUser)){
            await post.updateOne({ $pull: { likes: req.body.currentUser }})
            res.status(200).json('dislike');
        }else{
            await post.updateOne({ $push: { likes: req.body.currentUser }})
            res.status(200).json("like");
        }
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
});

//Suggest some friends

app.post('/suggestFriends', async (req,res) => {
    try {
        const sFriends = await User.find().limit(8);
        res.status(200).json(sFriends);

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = (app);