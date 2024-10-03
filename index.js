const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req,res){
    fs.readdir(`./files`, function(err, files){
        res.render("index",{files: files});
    })
});

app.post('/create', function(req,res){
    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details, function(err){
        res.redirect("/");
    })
});

app.get('/files/:filesname', function(req,res){
    fs.readFile(`./files/${req.params.filesname}`,"utf-8", function(err, filedata){
        res.render('show', {filesname: req.params.filesname, filedata: filedata})
    })
});

app.get('/edit/:filesname', function(req,res){
    res.render('edit', {filesname: req.params.filesname})
});


app.post('/edit', function(req,res){
    fs.rename(`./files/${ req.body.prev}`,`./files/${req.body.new}`, function(err){
        res.redirect("/");
    })
});

app.listen(3000);