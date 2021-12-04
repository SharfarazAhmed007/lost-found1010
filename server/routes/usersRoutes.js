
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const auth = require('../middleware/auth.js');
const userController = require('../controller/userController');
// const { authenticate } = require('passport');


// Get all the users
router.get('/', auth, userController.getAllUser);

//user sign up 
router.post('/register', userController.registerController);

router.post('/login', userController.loginController);



//get a user by id 
//router.get('/:id', async(req, res) => {});
 

//user log in
//router.post('/login', async(req, res, next)=>{}); 

//user info update
//router.put('/:id', async (req, res) => {});

//user delete
//router.delete('/:id', async(req, res) => {});
 
module.exports = router;

