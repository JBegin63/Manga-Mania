const Manga = require('../models/manga.model');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const createManga = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Manga.create({ ...req.body, createdBy: user._id })
        .then((newManga) => {
            res.status(200).json(newManga);
        })
        .catch((err) => {
            console.log('Error in creating manga', err);
            res.status(400).json({ message: "something went wrong in creating the manga", error: err.errors });
        });
};

const getManga = (req, res) => {
    Manga.find({}).populate('likes', 'id')
        .then((manga) => {
            res.json(manga);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the manga", error: err });
        })
};

const getMangaByUser = (req, res) => {
    User.findOne({ _id: req.params.id }).then((user) => {
        Manga.find({ likes: user._id })
            .populate('likes', 'id')
            .then((manga) => {
                res.json(manga);
            })
            .catch((err) => {
                console.log(err);
                res.status(400)
                .json({ message:"something went wrong in finding all the manga", error: err });
            })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the manga", error: err });
        })
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
            console.log(res);
            console.log(updatedManga);
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

const liked = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Manga.findByIdAndUpdate({ _id: req.params.id } , { $addToSet: { likes: user._id, } }, { new: true, useFindAndModify: false })
        .then((likedManga) => {
            res.json(likedManga);
        })
        .catch((err) => {
            console.log('Error in liking manga', err);
            res.status(400).json({ message:"something went wrong in liking the manga", error: err });
        });
};

const unliked = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Manga.findOneAndUpdate({ _id: req.params.id } , {$pull: { likes: user._id }},  { new: true, useFindAndModify: false })
        .then((likedManga) => {
            console.log(likedManga);
            res.json(likedManga);
        })
        .catch((err) => {
            console.log('Error in liking manga', err);
            res.status(400).json({ message:"something went wrong in liking the manga", error: err });
        });
};

module.exports = {
    createManga,
    getManga, 
    getMangaById,
    updateManga,
    deleteManga,
    liked,
    unliked,
    getMangaByUser,
}