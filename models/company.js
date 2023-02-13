const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pas de nom'],
    },
    siretnumber: {
        type: Number,
        required: [true,"Pas de numéro de siret"]
    },
    email: {
        type: String,
        require: [true, "Pas d'email"]
    },
    ceoname: {
        type: String,
        require: [true,"Pas de nom de PDG"]
    },
    password: {
        type: String,
        required: [true, 'Pas de mot de passe']
    },
    employees: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "employees"
        }]
    }

})

const CompanyModel = mongoose.model('Companys', companySchema);

module.exports = CompanyModel