const express = require("express");
const loginRouter = express.Router();
const CompanyModel = require('../models/company');
const routeGuard = require("../custom/authGard");
const crypto = require("../custom/crypto")

loginRouter.get('/companylogin', async (req, res) => {
    try {
     
       res.render('../views/templates/loginform.twig')
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })

 loginRouter.post('/companylogin', async (req, res) => {
    try {
     let company = await CompanyModel.findOne({ email:req.body.email
     })
     
    if(company){
      if(await crypto.comparePassword(req.body.password, company.password)){
         req.session.companyId = company._id
         res.redirect('/employee')
    }
     }else{

      res.redirect('/employee')
     }
    
   
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })

 loginRouter.get("/deconnect",routeGuard,async (req,res )=> {
   try {
      req.session.destroy()
      res.redirect("/")

   }catch (err){
      console.log(err);
      res.send(err);
   }
 })


 module.exports = loginRouter