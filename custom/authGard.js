const CompanyModel =require ('../models/company.js')

let routeGuard = async ( req,res,next)=> {
    let company = await CompanyModel.findOne({_id: req.session.companyId})
    if ( company){
        next()
    }else {
        res.redirect('/')
    }
 
}

module.exports = routeGuard