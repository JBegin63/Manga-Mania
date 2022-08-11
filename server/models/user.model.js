const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: [2, 'Your first name should be longer than 2 characters'],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [2, 'Your last name should be longer than 2 characters']
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            minlength: [3, 'Your username should be longer than 3 characters']
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, 'Your password must be 8 characters or longer']
        },
        profilePic: {
            type: String,
            required: [true, 'Profile picture is required']
        },
        likes: [
            {type: mongoose.Schema.Types.ObjectId, ref: "Manga"}
        ]
    }, { timestamps: true, });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => this._confirmPassword = value);

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match')
    }
    next();
});

UserSchema.pre('save', async function (next) {
    console.log('inside pre-save', this.password);
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('HASHED', hashedPassword);
        this.password = hashedPassword;
        next()
    } catch (error) {
        console.log('Error in save', error)
    }
})

//mongoose makes it lowercase and plur so User becomes users
const User = mongoose.model('User', UserSchema);
module.exports = User;