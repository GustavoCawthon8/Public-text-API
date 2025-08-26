const express = require('express');
const chalk = require("chalk");
const session = require("express-session");
const cors = require("cors")

//variavesi locais
const PORT = process.env.PORT || 9898;
const app = express();

//modulos
const database = require("./config/db");
const router = require("./routes/AuthRouter");

//middleware
app.use(cors());
app.use(express.json());
app.use(router);

app.use(session({
  secret: "publictext_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 *60
  }
}))

// rodando o servidor
app.get('/', (req, res)=>{
  res.send('API Rodando')
})

database.sync().then(()=>{
  app.listen(PORT, ()=>{
    console.log(chalk.blue(`Servidor rodando em https://localhost:${PORT}`))
  })
}).catch(err => console.log(err))