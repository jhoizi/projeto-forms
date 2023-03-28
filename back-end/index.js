const express = require('express');
var {mongoose, startDB} = require('./db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const UserController = require('./controllers/UserController.js')
const cors = require('cors');
const authController = require('./AuthorizationController.js');


const app = express();

app.use(cors());
app.use(express.json());

startDB();

app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.get('/', authController.authorized, UserController.all);
app.delete('/remove/:id', UserController.remove);

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
});
