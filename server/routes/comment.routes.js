const CommentController = require("../controllers/comment.controller");

module.exports = app => {
    app.get('/api/comments', CommentController.getComments);
    app.get('/api/comment/:id', CommentController.getCommentById);
    app.get('/api/mangaByComment/:id', CommentController.getMangaByComment);
    app.post('/api/comment', CommentController.createComment);
    app.put('/api/comment/:id', CommentController.updateComment);
    app.delete('/api/comment/:id', CommentController.deleteComment);
}