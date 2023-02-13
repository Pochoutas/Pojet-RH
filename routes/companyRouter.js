
const companyRouter = require('express').Router();
const CompanyModel = require('../models/company');
const crypto = require("../custom/crypto");


companyRouter.get('/', async (req, res) => {
   try {
      
      let companys = await CompanyModel.find()
      res.render('../views/templates/main.twig',{
         tata :companys
      })
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})


companyRouter.get('/addcompany', async (req, res) => {
   try {
      res.render('../views/templates/formaddcompany.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

companyRouter.post('/addCompany', async (req, res) => {
    try {
      req.body.password = await crypto.cryptPassword(req.body.password)
       let company = new CompanyModel(req.body)
       company.save()
       req.session.companyId = company._id
       res.redirect('/employee')
    } catch (err) {
       console.log(err);
       res.send(err);
    }
 })


 module.exports = companyRouter