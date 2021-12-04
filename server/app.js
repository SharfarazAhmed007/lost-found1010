
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//const passport = require('passport');


const userRoutes = require('./routes/usersRoutes.js');
//const userController = require('./controller/userController.js');



const localhost = '127.0.0.1';

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connection.on('error', (err)=> {
    console.log(err);
});

mongoose.connection.once('open', () => {
    console.log('Database Connection Established');
});

mongoose.connect("mongodb://localhost/lostfound",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use(cookieParser());




app.use('/users', userRoutes);

app.get('/', (req, res) => {
    //res.status(200).send(`welcome to login, sign-up api`);
    //console.log('TEST!');
    res.send("Hello from homepage !");
}); 


//404 error handler 
app.use((req, res, next) => {
    res.status(404).send('Requested url was not found');
});


//application error handler 
app.use((err, req, res, next) => {
    if(err.message) {
        res.status(500).send(err.message);
    } else {
        res.status(500).send('There was an error!');
    }
});



app.use((err, req, res, next) => {
    if(res.headerSent){
        return next(err); 
    }
});


// //default error handler
// function errorHandler(err, req, res, next) { 
//     if(res.headersSent){
//         return next(err);
//     }
// }

app.listen(port, localhost, ()=>{
    console.log(`Server running at http://${localhost}:${port}`);
});