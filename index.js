const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {filmModel} = require("./models/film.model");
const {initializeDatabase} = require("./db/db.connect");
const app = express();
const PORT = 3000;
const mongoUri = process.env.MONGODB;

app.use(cors());
app.use(express.json());

initializeDatabase(mongoUri)
.then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT ", PORT);
    })
})
.catch((error) => {
    console.log(error);
})

// function to add new movie
async function addNewFilm(filmData) {
    let addedFilm = await new filmModel(filmData).save();
    return addedFilm;
}

// function to add multiple films
async function addMultipleFilms(filmsData) {
    let addedFilms = await filmModel.insertMany(filmsData);
    return addedFilms;
}

// function to get films
async function getAllFilms() {
    let films = await filmModel.find();
    return films;
}

// function to get film by Id
async function getFilmById(id) {
    let film = await filmModel.findById(id);
    return film;
}

// function to update film details by id
async function updateFilmDetailsById(id, updatedData) {
    let updatedFilm = await filmModel.findByIdAndUpdate(id, updatedData, { new: true });
    return updatedFilm;
}

// function to delete film by id
async function deleteFilmById(id) {
    let deletedFilm = await filmModel.findByIdAndDelete(id);
    return deletedFilm;
}

// POST route to add new film
app.post("/film/new", async (req, res) => {
    let filmData = req.body;
    try {
        let response = await addNewFilm(filmData);
        return res.status(201).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to add multiple films
app.post("/films/new", async (req, res) => {
    let filmsData = req.body;
    try {
        let response = await addMultipleFilms(filmsData);
        return res.status(201).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to get all films
app.get("/films", async (req, res) => {
    try {
        let response = await getAllFilms();
        if (response.length === 0) {
            return res.status(404).json({message: "Films not found"});
        }
        return res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// GET route to film by id
app.get("/film/details/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let response = await getFilmById(id);
        if (response === null) {
            return res.status(404).json({ message: "Film not found"});
        }
        return res.status(200).json(response)
    } catch(error) {
        res.status(500).json({ error: error.message});
    }
});

// POST route to update film details by id
app.post("/film/update/:id", async (req, res) => {
    let id = req.params.id;
    let updatedData = req.body;
    try {
        let response = await updateFilmDetailsById(id, updatedData);
        if (response === null) {
            return res.status(404).json({ message: "Film to be updated not found"});
        }
        return res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE route to delete film by id
app.delete("/film/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        let response = await filmModel.findByIdAndDelete(id);
        return res.status(200).json(response);
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
});


