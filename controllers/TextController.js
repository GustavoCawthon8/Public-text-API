const Text = require("../models/Text");

module.exports = class TextController {
  //puxando dados do banco de dados
  static async dashboard(req, res) {
    const texts = await Text.findAll({raw: true});
    res.json({texts});
  }

  //enviando dados pro banco de dados
  static async createText(req, res){
    try{
      const text = {
        text: req.body.text
      }
      await Text.create(text);
      res.json({message: "Texto criado com sucesso"});

    }catch(err){
      res.json({message: "Erro ao criar texto"})
    }
  }

};