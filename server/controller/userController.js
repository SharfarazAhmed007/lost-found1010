const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerController = (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, async(err, hash) => {
            if (err) {
                res.json({
                    error: err
                });
            }

            let user = new userModel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: hash
            });

            await user.save();
            //console.log(user);
            res.send({ user });
            next();
        });
     } catch (e) {
        res.send(e.message);
    }
    // user.save()
    //     .then(result => {
    //         res.json({
    //             message: 'User has been Created Successfully',
    //             user: result
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             err
    //         })
    //     })        
    // res.json({
    //     user,
    //     hash,
    //     original: req.body.password  
    // })
};


const loginController = async (req, res, next) => {

    try{

        const email = req.body.email;
        const password = req.body.password;

        const userLogin = await userModel.findOne({email});
        if(userLogin){
            bcrypt.compare(password, userLogin.password, (err, result) => {
                if(err){
                    res.json({
                        message: "Error Occured"
                    });
                }

                if(result){
                    let token = jwt.sign({email: userLogin.email, _id: userLogin._id}, 'sherlocked085', {expiresIn: '2h'});
                    res.json({
                        message: 'Login Successful',
                        token
                    });
                } else {
                    res.json({
                        message: 'Credentials doesn\'t match',
                    });
                }
            
            });

        } else {
            res.json({
                message: 'User Not Found'
            });
        }   

    } catch(err){
        res.end();
    }
};



const getAllUser = async (req, res, next) => {
    
    try{
        const users = await userModel.find();
        res.send({users});
    }catch(err){
        res.send(err);
    }
    
}


module.exports = {
    registerController,
    getAllUser,
    loginController
};


