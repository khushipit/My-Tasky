var mongoose = require("mongoose");

var taskSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	show: {
		type: Boolean,
		required: true
	}
})

var Task = module.exports = mongoose.model("Task", taskSchema);

module.exports.getTasks = function(callback, limit){
Task.find(callback).limit(limit);
}