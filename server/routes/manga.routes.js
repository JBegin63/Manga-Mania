const MangaController = require("../controllers/manga.controller");

module.exports = app => {
    app.get('/api/manga', MangaController.getManga);
    app.get('/api/manga/:id', MangaController.getMangaById);
    app.post('/api/manga', MangaController.createManga);
    app.put('/api/manga/:id', MangaController.updateManga);
    app.delete('/api/manga/:id', MangaController.deleteManga);
    app.put('/api/manga/:id', MangaController.liked);
}