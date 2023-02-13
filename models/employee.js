const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: [true, 'Pas de photo'],
    },
    name: {
        type: String,
        required: [true,"Pas de nom"]
    },
    post: {
        type: String,
        require: [true, "Pas de poste"]
    },
    blame: {
        default:0,
        type: Number,
        
    },
})

const EmployeeModel = mongoose.model('employees', employeeSchema);

module.exports = EmployeeModel