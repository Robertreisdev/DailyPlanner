const express = require('express');
const toDoModel = require("../models/models")
const router = express.Router();

//Creates new ToDo
router.post("/", async (req, res) => {
    try {
        const task = await new toDoModel(req.body).save();
        res.send(task);
    } catch(error) {
        res.send(error);
    }
});

//Find toDos and pass back to file
router.get("/", async (req, res) => {
    try {
        const tasks = await toDoModel.find();
        res.send(tasks);
    } catch(error) {
        res.send(error);
    }
});

//Update ToDo i think this is what makes it complete or not complete with the line going through it
router.put("/:id", async (req, res) => {
    try {
        const task = await toDoModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch(error) {
        res.send(error);
    }
});

//Deletes ToDo
router.delete("/:id", async (req, res) => {
    try {
        const task = await toDoModel.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch(error) {
        res.send(error);
    }
});

module.exports = router;