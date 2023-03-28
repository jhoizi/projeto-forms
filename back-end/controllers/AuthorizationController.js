const jwt = require('jsonwebtoken');
const {promisify} = require('util');

class AuthorizationController{
    chave = "papazinhacontinualinda";
    async authorized(req, res, next){
        const chave = "papazinhacontinualinda";
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(400).json({message : 'Faça o login para poder acessar!'});
        }

        const [, token] = authHeader.split(' ');

        if(!token){
            return res.status(400).json({message : 'Faça o login para poder acessar!'});
        }

        try{
            const decode = await promisify(jwt.verify(token, chave));
            return next();
        }catch(err){
            return res.status(400).json({messagem : `Erro ao decodificar token! ${err}`});
        }
    }

    getToken(userInfo, timeExpiration){
        return jwt.sign(userInfo, this.chave, {expiresIn : timeExpiration});
    }


}

module.exports = new AuthorizationController();
