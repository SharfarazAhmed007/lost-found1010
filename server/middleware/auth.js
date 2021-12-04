
//for authorization

const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decode = jwt.verify(token, 'sherlocked085');
        
        req.user = decode;
        next(); //jate porer middlewaregula kam kore...

    } catch(err){
        res.json({
            message: 'Authentication Failed'
        })
    }
}

module.exports = auth;