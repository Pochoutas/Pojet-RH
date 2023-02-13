const express = require('express');
const mongoose = require('mongoose');
const multer = require ('multer');
const session = require ('express-session');
require("dotenv").config();
const companyRouter = require ('./routes/companyRouter.js')
const employeeRouter = require ('./routes/employeeRouter.js')
const loginRouter = require ('./routes/loginRouter.js')
const app = express()

app.use(session({secret: process.env.SECRET_SESSION,saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(companyRouter)
app.use(employeeRouter)
app.use(loginRouter)

app.listen(process.env.PORT,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(process.env.URL_BDD,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})