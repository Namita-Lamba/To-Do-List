const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const https = require('https');

const app = express();




app.set('view engine', 'ejs');    // whenever u work with ejs

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


mongoose.connect('mongodb+srv://Namita:<password>@clustertodo.dkdaubg.mongodb.net/todoDB');


const ItemsSchema = {
  name: String
};


const Item = mongoose.model('Item', ItemsSchema);


app.get("/", function(req, res){

  var today = new Date();
  var options = {
    weekday: "long", day:"numeric", month:"long"
  };
  var day = today.toLocaleDateString("en-US", options);

  Item.find({}, function(err, itemsAlreadyinDB){
    res.render("list", { listTitle: day, newListItems: itemsAlreadyinDB });
  })



})


app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

    item.save();

    res.redirect("/");


});



app.post("/delete", function(req, res){

  const crossedItem = req.body.checkbox;

  Item.findByIdAndRemove(crossedItem, function(err) {
    if(!err){
      res.redirect("/");
    }
  })

})




const port = process.env.PORT || 5000;
app.listen( port, function(){
  console.log("Server is running at port 5000")
})
