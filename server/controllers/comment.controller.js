const Comment = require('../models/comment.model');
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const createComment = (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET)
    Comment.create({...req.body, createdBy: user._id, commentFor: title._id})
        .then((newComment) => {
            res.status(200).json(newComment);
        })
        .catch((err) => {
            console.log('Error in creating comment', err);
            res.status(400).json({ message:"something went wrong in creating the comment", error: err.errors });
        });
};

const getComments = (req, res) => {
    Comment.find({}).populate('createdBy', 'firstName lastName email', 'commentForManga', 'title')
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the comment", error: err });
        })
};

const getCommentById = (req, res) => {
    Comment.find({ _id: req.params.id }).populate('title')
        .then((comment) => {
            res.json(comment);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding the comment", error: err });
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
}