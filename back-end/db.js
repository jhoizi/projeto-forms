const mongoose = require('mongoose');

async function startDB(){
        try{
            mongoose = await mongoose.connect(process.env.MONGODB_URL).then(() => {console.log('conectado...')}).catch((err) => {console.log(err)});
        }catch(err){
                console.log(err);
        }      
}


module.exports = {mongoose: mongoose, startDB : startDB};
