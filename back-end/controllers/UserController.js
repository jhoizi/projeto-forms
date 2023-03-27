const User = require('../models/User.js');

class UserController{

    async signup(req, res){
        const createdUser = await User.create(req.body);
        return res.status(200).json(createdUser);
    }

    async login(req, res){
        const {login, password} = req.body;
        var user;
        try {
            const byEmail = User.findOne({email : login});
            const byName = User.findOne({name: login});

            if(!byName && !byEmail){
                return res.status(404).json({message: 'Erro ao fazer login, cheque seu login e senha'});
            }

            user = !byName ? byEmail : byName;

            if(!(user.password == password)){
                return res.status(404).json({message: 'Erro ao fazer login, cheque seu login e senha'});
            }
        } catch (error) {
            return res.status(404).json({message: 'Erro Login!'});
        }
        return res.redirect('/')
    }
}

module.exports = new UserController();