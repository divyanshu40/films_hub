const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actors:{
        type: [String]
    },
    genres: {
        type:[String]
    },
    ticketPrice: {
        type: Number
    },
    ticketsSold: {
        type: Number
    },
    revenue: {
        type: Number
    },
    isSuperhit: {
        type: Boolean
    }
    
}, {
    timestamps: true
});

const filmModel = mongoose.model("film", filmSchema);

module.exports = { filmModel };