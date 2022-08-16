const Comment = require('../models/comment.model');
const Manga = require('../models/manga.model');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const createComment = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Comment.create({...req.body, createdBy: user._id, taggedManga: req.manga})
        .then((newComment) => {
            res.status(200).json(newComment);
        })
        .catch((err) => {
            console.log('Error in creating comment', err);
            res.status(400).json({ message:"something went wrong in creating the comment", error: err.errors });
        });
};

const getComments = (req, res) => {
    Comment.find({})
        .populate('taggedManga', 'title coverImage')
        .populate('createdBy', 'username email profilePic')
        .then((comment) => {
            console.log(comment)
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the comment", error: err });
        })
};

const getCommentById = (req, res) => {
    Comment.find({ _id: req.params.id })
        .populate('taggedManga', 'title')
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding the comment", error: err });
        })
};

const getMangaByComment = (req, res) => {
    Manga.findOne({ _id: req.params.id }).then((manga) => {
        Comment.find({ taggedManga: manga._id })
            .populate('taggedManga', 'id')
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

const updateComment = (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((updatedComment) => {
            res.json(updatedComment);
        })
        .catch((err) => {
            console.log('Error in updating comment', err);
            res.status(400).json({ message:"something went wrong in updating the comment", error: err });
        });
};

const deleteComment = (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
        .then((comment) => {
            console.log(comment);
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in deleting the comment", error: err });
        })
};

module.exports = {
    createComment,
    getComments,
    getCommentById,
    updateComment,
    deleteComment,
    getMangaByComment,
}