const UserController = require("../controllers/user.controller");

module.exports = app => {
    app.post('/register', UserController.register);
    app.post('/login', UserController.login);
    app.post('/logout', UserController.logout);
    app.get('/api/current-user', UserController.getLoggedInUser);
    app.get('/api/users', UserController.getUsers);
    app.get('/api/user/:id', UserController.getUserById);
    app.put('/api/user/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
    app.put('/api/user/like/:id', UserController.liked);
    app.put('/api/user/unlike/:id', UserController.unliked);
}