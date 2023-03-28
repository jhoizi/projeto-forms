const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const authController = require('./AuthorizationController.js');
class UserController{

    async signup(req, res){
        var createdUser;
        try{
            var {password, phone, name, email} = req.body;
            password = bcrypt.hash(password, 8);
            createdUser = await User.create({password, phone, name, email});
        }catch(err){
            return res.status(400).json({message : `erro ao criar usuário! ${err}`});
        }
        return res.status(200).json(JSON.stringify(createdUser));
    }

    async login(req, res){
        const {login, password} = req.body;
        var user;
        try {
            const byEmail = await User.findOne({email : login}).exec();
            const byName = await User.findOne({name: login}).exec();

            if(!byName && !byEmail){
                return res.status(400).json({message: 'Erro ao fazer login, cheque seu login e senha'});
            }

            user = !byName ? byEmail : byName;

            if(!(bcrypt.compare(password, user.password))){
                return res.status(400).json({message: 'Erro ao fazer login, cheque seu login e senha'});
            }else{
                return res.status(200).json(JSON.stringify({message : user, token : authController.getToken(user, 3600)}));
            }
        } catch (err) {
            return res.status(400).json({message: `Erro Login! ${err}`});
        }
    }

    async all(req, res){
        var allUsers;
        try{
            allUsers = await User.find({});
        }catch(err){
            return res.status(400).json({message : 'Erro na busca dos usuários!'});
        }

        return res.status(200).json(JSON.stringify(allUsers));
    }

    async remove(req, res){
        const id = req.params.id;

        try{
            await User.findByIdAndDelete(id).exec();
        }catch(err){
            return res.status(400).json({message : 'Erro ao excluir usuário!'});
        }
        return res.status(200).json({message : 'removido!'});
    }
}

module.exports = new UserController();
