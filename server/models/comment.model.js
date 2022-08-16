const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "Hey! You forgot to comment :P"],
            minlength: [2, 'Comment must be at least 2 characters long'],
            maxlength: [300, 'Comment can only be 300 characters long']
        },
        likeCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        dislikeCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        reply: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        taggedManga: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Manga'
        }
    }, { timestamps: true, });

//mongoose makes it lowercase and plur so User becomes users
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;