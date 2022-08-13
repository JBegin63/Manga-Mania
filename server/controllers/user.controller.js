const User = require('../models/user.model');
const Manga = require('../models/manga.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;
console.log('Secret', SECRET);

const register = async (req, res) => {
    const { body } = req;
    const queriedUser = await User.findOne({ email: body.email });
    if (queriedUser) {
        res.status(400).json('Email already exists')
        return;
    }
    try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log('User created', newUser);
    const userToken = jwt.sign(
        { _id: newUser._id, email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName, username: newUser.username, profilePic: newUser.profilePic },
        SECRET,
        );
        console.log('JWT:', userToken);
        res
            .status(201)
            .cookie('userToken', userToken, { expires: new Date(Date.now() + 90000000) })
            .json({ successMessage: 'user created', user: newUser });
    } catch (error) {
        console.log('Register error', error);
        res.status(400).json(error);
    }
};

const login = async (req, res) => {
        const userDocument = await User.findOne({ email: req.body.email });
        console.log('User document', userDocument);
        if(!userDocument) {
            res.status(400).json({ error: 'invalid email/password' });
        } else {
            try {
                const isPasswordValid = await bcrypt.compare(req.body.password, userDocument.password);
                if (!isPasswordValid) {
                    res.status(400).json({ error: 'invalid email/password' });
                } else {
                    const userToken = jwt.sign(
                        { _id: userDocument._id, email: userDocument.email, firstName: userDocument.firstName, lastName: userDocument.lastName, username: userDocument.username, profilePic: userDocument.profilePic },
                            SECRET,
                        );
                        console.log('JWT:', userToken);
                        res
                            .status(201)
                            .cookie('userToken', userToken, { expires: new Date(Date.now() + 90000000) })
                            .json({ successMessage: 'user logged in', user: userDocument });
                }
            } catch (error) {
                console.log('Login error', error);
                res.status(400).json({ error: 'invalid email/password' });
            }
        }
};

const logout = (req, res) => {
    res.clearCookie("userToken");
    res.json({ successMessage: "User logged out" });
};

const getLoggedInUser = async (req, res) => {
    console.log('Token', req.cookies)
    const user = jwt.verify(req.cookies.userToken, SECRET);
    User.findById({ _id: user._id })
        .then((user) => {
            console.log(user)
            res.json(user);
        })
        .catch((error) => {
            console.log(error);
        })
};

const getUsers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(res);
            console.log(users);
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the users", error: err });
        })
};

const getUserById = (req, res) => {
    User.find({ _id: req.params.id })
        .then((user) => {
            console.log(res);
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in finding all the users", error: err });
        })
};

const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((updatedUser) => {
                console.log(res);
                console.log(updatedUser);
                res.json(updatedUser);
            })
            .catch((err) => {
                console.log('Error in updating user', err);
                res.status(400).json({ message:"something went wrong in updating the user", error: err });
            });
}

const deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => {
            console.log(res);
            console.log(user);
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(400)
            .json({ message:"something went wrong in deleting the user", error: err });
        })
};

const liked = async (req, res) => {
    const user = jwt.verify(req.cookies.userToken, SECRET);
    User.findOneAndUpdate({ _id: user._id }, { $addToSet: { likes: req.params.id, }}, { new: true, useFindAndModify: false })
        .then((likedManga) => {
            console.log('//')
            console.log(user);
            console.log(likedManga);
            console.log('//')
            res.json(likedManga);
        })
        .catch((err) => {
            console.log('Error in liking manga', err);
            res.status(400).json({ message:"something went wrong in liking the manga", error: err });
        });
};

module.exports = {
    register, 
    logout,
    login,
    getLoggedInUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    liked,
}