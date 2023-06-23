const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signup = require('./Routes/signup');
const signin = require('./Routes/signin');
const main = require('./Routes/main');
const profile = require('./Routes/profile');
const messanger = require('./Routes/messanger')
const app = express();
const env = require('dotenv').config();

//--------------Setting image path for multer---------------
const path = require('path');
app.use('/images' , express.static(path.join(__dirname, '/images')));

//--------------Setting server---------------
app.use(express.json());
app.use(cors());

//--------------Connect to mongoDB---------------
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology : true
    }
).then(console.log('connected to Database'))
 .catch((err) => console.log(err));
 
 //-----------------Routs--------------------
app.use('/' , signup);
app.use('/signin', signin )
app.use('/main', main);
app.use('/profile', profile);
app.use('/msngr', messanger)


//-----------------Start server ( npm start at localhost:4000 )--------------------
app.listen('4000', ()=> {
    console.log('running');
});