const Text = require("../models/Text");
const User = require("../models/User");

module.exports = class TextController {
  static async dashboard(req, res) {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const user = await User.findOne({
      where: { id: userId },
      include: Text,
      plain: true,
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const texts = user.Texts?.map((result) => result.dataValues) || [];
    const emptyTexts = texts.length === 0;

    res.json({ texts, emptyTexts });
  }

  static async createText(req, res){
    try{
      const {text} = req.body;
      const texts = await Text.create({text});
      res.json({message: "Texto criado com sucesso", texts});
    }catch(err){
      res.json({message: err.message})
    }
  }
};