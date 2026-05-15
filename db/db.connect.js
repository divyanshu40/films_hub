const mongoose = require("mongoose");

const initializeDatabase = async(uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to the MONGODB database")
    } catch(error){
        console.log(error);
    }
}

module.exports = { initializeDatabase };