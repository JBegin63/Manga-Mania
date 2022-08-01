const Manga = require('../models/manga.model');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const createManga = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Manga.create({...req.body, createdBy: user._id})
        .then((newManga) => {
            res.status(200).json(newManga);
        })
        .catch((err) => {
            console.log('Error in creating manga', err);
            res.status(400).json({ message:"something went wrong in creating the manga", error: err.errors });
        });
};

const getManga = (req, res) => {
    Manga.find({}).populate('createdBy', 'firstName lastName email')
        .then((manga) => {
            res.json(manga);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the manga", error: err });
        })
};

const getMangaById = (req, res) => {
    Manga.find({ _id: req.params.id })
        .then((manga) => {
            res.json(manga);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding the manga", error: err });
        })
};
const updateManga = (req, res) => {
    Manga.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((updatedManga) => {
            res.json(updatedManga);
        })
        .catch((err) => {
            console.log('Error in updating manga', err);
            res.status(400).json({ message:"something went wrong in updating the manga", error: err });
        });
};

const deleteManga = (req, res) => {
    Manga.deleteOne({ _id: req.params.id })
        .then((manga) => {
            res.json(manga);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in deleting the manga", error: err });
        })
};

module.exports = {
    createManga,
    getManga, 
    getMangaById,
    updateManga,
    deleteManga
}