const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');


const lostItemModel = mongoose.Schema({

    type: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },

    place: {
        type: String,
        trim: true,
        required: true,
        //minlength: 11,
        // unique: true
    },

    uploadDate: {
        type: Date,
        default: Date.now
    },

    img: {
        data: Buffer,
        type: String
    },

    foundDate: uploadDate,

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