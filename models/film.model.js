const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actors:{
        type: [String]
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
    isSuperHit: {
        type: Boolean
    }
    
}, {
    timestamps: true
});

const filmModel = mongoose.model("film", filmSchema);

module.exports = { filmModel };