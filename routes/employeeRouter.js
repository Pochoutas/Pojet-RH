const express = require("express");
const employeeRouter = express.Router();
const CompanyModel = require('../models/company');
const EmployeeModel = require('../models/employee');
const multer = require("../custom/multer")
const routeGuard = require("../custom/authGard")
const fs = require('fs');

employeeRouter.get('/addemployee', routeGuard, async (req, res) => {
   try {

      res.render('../views/templates/employeeform.twig')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})


employeeRouter.post('/addemployee', routeGuard, multer.single('picture'), async (req, res) => {
   try {
      req.body.picture = req.file.filename
      let employee = new EmployeeModel(req.body)
      employee.save()
      await CompanyModel.updateOne({ _id: req.session.companyId }, { $push: { employees: employee._id } })
      res.redirect('/employee')
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

employeeRouter.get('/employee', routeGuard, async (req, res) => {
   try {
      let company = await CompanyModel.findOne({ _id: req.session.companyId }).populate({path: "employees", options: {sort:{name: "desc"}}})
      let namecomp = await CompanyModel.findOne({ _id: req.session.companyId })
      res.render("../views/templates/employeelist.twig", {
         employees: company.employees,
         company: namecomp
      })

   } catch (err) {
      console.log(err);
      res.send(err);
   }
})



employeeRouter.get('/employeeupdate/:id', routeGuard, async (req, res) => {
   try {
      let employee = await EmployeeModel.findOne({ _id: req.params.id })
      res.render("../views/templates/updateform.twig", {
         employee: employee
      })
   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

employeeRouter.post('/employeeupdate/:id', routeGuard, multer.single("picture"), async (req, res) => {
   try {
      if (req.file) {
         req.body.picture = req.file.filename;
         let employee = await EmployeeModel.findOne({ _id: req.params.id })
         fs.unlinkSync('assets/uploads/' + employee.picture)
      }
      await EmployeeModel.updateOne({ _id: req.params.id }, req.body)
      res.redirect("/employee")

   } catch (err) {
      console.log(err);
      res.send(err);
   }
})

employeeRouter.get('/employeedelete/:id', async (req, res) => {
   try {
      let employee = await EmployeeModel.findOne({ _id: req.params.id })
      await EmployeeModel.deleteOne({ _id: req.params.id })
      await CompanyModel.updateOne({ _id: req.session.companyId }, { $pull: { employees: req.params.id } })
      fs.unlinkSync('assets/uploads/' + employee.picture)
      res.redirect("/employee")
   } catch (err) {
      res.send(err);
   }
})

employeeRouter.get('/blame/:id', routeGuard, async (req, res) => {
   try {
      let employee = await EmployeeModel.findOne({ _id: req.params.id })

      await EmployeeModel.updateOne({ _id: req.params.id }, { blame: employee.blame + 1 })
      if (employee.blame >= 2) {
         res.redirect(`/employeedelete/${req.params.id}`)
      } else {
         res.redirect("/employee")
      }

   } catch (err) {
      res.send(err);
   }
})

employeeRouter.get('/disblame/:id', routeGuard, async (req, res) => {

   try {
      let employee = await EmployeeModel.findOne({ _id: req.params.id })

      await EmployeeModel.updateOne({ _id: req.params.id }, { blame: employee.blame - 1})

      res.redirect("/employee")

   } catch (err) {
      res.send(err);
   }
})

employeeRouter.get('/test', async (req, res) => {
   try {
      res.render("templates/test.twig")
   } catch (err) {
      res.send(err);
   }
})

module.exports = employeeRouter