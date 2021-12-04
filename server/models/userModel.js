
const mongoose = require('mongoose');


const userModel = mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        trim: true,
        required: true,
    },

    phone: {
        type: String,
        trim: true,
        required: true,
        //minlength: 11,
        // unique: true
    },
    
    address: {
        type: String,
        trim: true,
        required: true,
        minlength : 4
    },
    password: String,
}, {timestamps: true}); 


// //Encrypt Password
// userModel.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// userModel.methods.validPassword = function(password) { 
//     return bcrypt.compareSync(password, this.password); 
// };



const user = mongoose.model('User', userModel);
module.exports = user;



