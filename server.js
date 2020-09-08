const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const authRouter=require('./routes/auth')
const port=process.env.PORT || 3000;

const app=express();

//Datbase password made secured
dotenv.config();

//Database connection
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology:true,useNewUrlParser:true})
        .then(()=>console.log('DB is connected'))
        .catch(err=>console.log(err))

//Body request received middleware
app.use(express.json());

// routes middlewares
app.use('/api/user',authRouter);



app.listen(port)




