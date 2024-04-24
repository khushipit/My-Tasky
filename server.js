var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var fs = require("fs");

var mongoose = require("mongoose");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

Task = require("./model/task");

mongoose.connect("mongodb://localhost/todo");

var database = mongoose.connection;

app.use(express.static(__dirname + '/'));

app.get("/", function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get("/get_tasks", function(req, res){
	Task.find({})
	.limit(10) // Optionally limit the number of documents returned
	.then(tasks => {
		res.json(tasks);
	})
	.catch(err => {
		res.status(500).send("Error retrieving tasks from the database");
	});
});

// API endpoint to add tasks to the database
app.post("/post_tasks", function(req, res) {
    var data = req.body;
    // Assuming data is an array of tasks
    Task.insertMany(data, function(err, result){
        if(err){
            res.status(500).send("Error adding tasks to the database");
        } else {
            res.status(200).send("Tasks added successfully");
        }
    });
});


app.listen(4000);
console.log("Radi - 4000");