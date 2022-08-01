const mongoose = require('mongoose');

const MangaSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, 'Your first name should be longer than 2 characters'],
        },
        author: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [2, 'Your last name should be longer than 2 characters']
        },
        score: {
            type: Number,
            required: [true, "Email is required"],
            minlength: [1, 'Your password must be 8 characters or longer'],
            maxlength: [10, 'Your password must be 8 characters or longer']
        },
        volumesCurrentlyOut: {
            type: Number,
            minlength: [1, 'Your password must be 8 characters or longer']
        },
        mangaStatus: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    }, { timestamps: true, });

//mongoose makes it lowercase and plur so User becomes users
const Manga = mongoose.model('Manga', MangaSchema);
module.exports = Manga;