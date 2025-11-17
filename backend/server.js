const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs')   //using for autoloading of routes
const bodyParser = require('body-parser');
require("dotenv").config()

const app = express();


//the below steps shoe how to connect database with mongoose all are necessary steps
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
    .then(() => console.log("DB connected succesfully"))
    .catch(err => console.log(`DB connection failed due to ${err}`))
//Db connection complete

//now apply middlewares for easy functioning of our app 
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }))
app.use(cors())


//now routes of server
// app.get('/api',(req,res)=>{                                  //req will be sent /api url and response will be stored in res
//     res.json({
//         data:"hey you hit node api",
//     })
// });
//now time for routes middleware

fs.readdirSync('./routes').map((r) => app.use('/api', require("./routes/" + r)))   //this will autoload all the route pages through middlewares or we can say it is autoloading routes

//now start the server

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
}

app.listen(process.env.PORT || 8000, () => {
    console.log(`server listening at port 8000`)


})

