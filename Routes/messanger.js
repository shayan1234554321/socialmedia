const app = require('express').Router() ;
const Conv = require('../modules/conv') ;
const Msg = require('../modules/messeges')


app.post('/getConv/:id' ,  async (req,res) => {
    try{
        const convId = await Conv.find({ids : {$all : [req.params.id ,req.body.selectedId]}})
        res.status(200).json(convId[0]);
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
})

app.post('/createConv/:id',async(req,res)=>{
    try{
        const conv = new Conv({
            ids: [ req.params.id , req.body.selectedId ]
        });
        conv.save();
        res.status(200).json("created");
    }catch(err){
        res.status(500).json(err)
    }
})

app.post('/sendMsg/:id',async(req,res)=>{
    try{

        console.log(req.body.conversationId)
        console.log(req.body.msg)
        const messsege = new Msg({
            convId: req.body.conversationId,
            senderId : req.params.id ,
            msg: req.body.msg
        });

        messsege.save();
        res.status(200).json("sent");
    }catch(err){
        res.status(500).json(err)
    }
});

app.post('/recieveMsg', async(req,res)=>{
    try{
        const msgs = await Msg.find({convId : req.body.conversationId}).sort({$natural:-1}).limit(10);
        res.status(200).json(msgs)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = app;