const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    }
},
{timestamp:true});

module.exports = mongoose.model("toDoModel", toDoSchema);