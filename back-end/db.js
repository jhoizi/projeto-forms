const mongoose = require('mongoose');

async function startDB(){
        mongoose = mongoose.connect(process.env.MONGODB_URL).then(
            () => {console.log('conectado...')}).catch((err) => {console.log(err)});
}


module.exports = {mongoose: mongoose, startDB : startDB};