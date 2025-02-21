const express = require('express');
const app = express();
// Définir le port
const PORT = 8000;
// Définir une route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express !');
});
// Définir une route personalisé
app.get('/ping', (req, res) => {
    res.send('pong');
});
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});