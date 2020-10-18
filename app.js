const express = require("express");
const bodyParser = require("body-parser");
const e = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Buy Food","Eat Food"];
let workItems = [];
app.get("/", (req, res) => {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var currentDay = today.toLocaleDateString("en-US", options)
    res.render("list", { listTitle: currentDay, items: items });
})

app.post("/", (req, res)=>{
    console.log(req.body);
    var item = req.body.new;

    if(req.body.list === "Work list"){
            workItems.push(item);
            res.redirect('/work');
    }else{
        var item = req.body.new;
        items.push(item);
        res.redirect('/');
    }
})

app.get("/work", (req, res)=> {
    res.render("list", { listTitle: "Work list", items: workItems });
})
app.get("/about", (req, res)=>{
    res.render("about");
})

app.listen(3000, () => {
    console.log("server run on 3000");
})
