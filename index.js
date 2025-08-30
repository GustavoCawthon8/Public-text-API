const express = require('express');
const chalk = require("chalk");
const session = require("express-session");
const cors = require("cors")

//variavesi locais
const PORT = process.env.PORT || 9898;
const app = express();

//modulos
const database = require("./config/db");
const authRouter = require("./routes/AuthRouter");
const textRouter = require("./routes/TextRouter");

//middleware
app.use(cors());
app.use(express.json());

app.use(session({
  secret: "publictext_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 *60
  }
}));

app.use(express.urlencoded({extended: true}));

// rodando o servidor
app.get('/', (req, res)=>{
  res.send('API Rodando')
});

//Routes
app.use("/auth", authRouter);
app.use("/text", textRouter);


database.sync({force: false}).then(()=>{
  app.listen(PORT, ()=>{
    console.log(chalk.blue(`Servidor rodando em https://localhost:${PORT}`))
  })
}).catch(err => console.log(err))