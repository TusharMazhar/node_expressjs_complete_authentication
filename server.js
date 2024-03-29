const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const authRouter=require('./routes/auth')
const postRouter=require('./routes/post')
const port=process.env.PORT || 3000;

const app=express();

//Datbase password made secured
dotenv.config();

// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});


//Database connection
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology:true,useNewUrlParser:true})
        .then(()=>console.log('DB is connected'))
        .catch(err=>console.log(err))

//Body request received middleware
app.use(express.json());

// routes middlewares
app.use('/api/user',authRouter);
app.use('/api/user',postRouter);



app.listen(port)




