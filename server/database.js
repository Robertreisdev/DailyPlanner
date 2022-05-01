const mongoose = require("mongoose");

module.exports = async () => {
    try {
        await mongoose.connect(
            "<Your MongoDB connection string>",
        );
        console.log("Connected to database.");
    } catch(error) {
        console.log("Could not connect to database.", error);
    }
}; 