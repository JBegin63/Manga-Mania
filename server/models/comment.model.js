const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, 'Your first name should be longer than 2 characters'],
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        commentFor: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Manga',
        },
    }, { timestamps: true, });

//mongoose makes it lowercase and plur so User becomes users
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;