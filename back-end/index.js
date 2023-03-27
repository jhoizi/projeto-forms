const express = require('express');
const {mongoose, startDB} = require('./db.js');
const jwt = require('jsonwebtoken');
// require('dotenv').config()
const UserController = require('./controllers/UserController.js')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

await startDB();

app.post('/signup', UserController.signup);
app.post('/login', UserController.login);
app.get('/', (req, res) => {
    res.send('<h1>Bem vindo ao Zé cashew forms</h1>');
});

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
});