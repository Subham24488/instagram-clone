const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {MONGOURI} = require('./config/keys')
const cors = require('cors');

const PORT = process.env.PORT || 5000;



mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected", () => {
    console.log("mongo connected");
});
mongoose.connection.on("error", (err) => {
    console.log("error", err);
});

require('./models/user');
require('./models/post')

app.use(cors())
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"))
    const path = require('path')
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, (req, res) => {
    console.log("you have reached 3k.")
})