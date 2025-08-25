const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = class AuthController{
    static async login(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email: email}});
        if(!user){
            res.status(404).json({message: "Usuário não encontrado"});
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if(!passwordMatch){
            res.status(401).json({message: "Senha incorreta"});
        }

        req.session.user = user.id;
        req.session.save(()=>{
            res.json({
                message: "Logado com sucesso",
                user:{id: user.id, name: user.name, email: user.email}
            })
        })
    }

    static async register(req, res){
        const {name, email, password} = req.body;
        const checkIfUserExist = await User.findOne({where: email})

        if(checkIfUserExist){
            res.json({message: "Usuário já existe"});
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: {id: user.id, name: user.name, email: user.email}
        });
    }
}