//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
const saltRounds = 10;


mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

const userSchema= new mongoose.Schema({
  email: String,
  password: String
});



const User= mongoose.model("User",userSchema);


app.get("/", function(req, res) {
  res.render("home")
});

app.get("/register", function(req, res) {
  res.render("register")

});


app.get("/login", function(req, res) {
  res.render("login")
});

app.post("/register",function(req,res){








  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  const user= new User({email:req.body.username, password: hash})
    user.save(function(err){
    if(err){
    console.log(err);
    }else{
    res.render("secrets");
    }

    })
  });


});

app.post("/login",function(req,res){
User.findOne({email:req.body.username},function(err,result){
if(!err){
  if(result){


    bcrypt.compare(req.body.password,result.password, function(err, resFound) {

      if(resFound===true){
          res.render("secrets");
      }

});



  }

}else{
  console.log(err);
}

})


})







app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
