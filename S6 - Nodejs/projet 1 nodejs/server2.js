const express = require('express');


const multer = require("multer");
const path = require("path");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());  // Permet les requêtes CORS depuis n'importe quelle origine

// Définir le port
const PORT = 8000;

const books = [
    { id: 1,book_name:'b1', kateb_name: 'bb1', image: 'img' },
    { id: 2,book_name:'b2', kateb_name: 'bb2', image: 'img' },
    { id: 3,book_name:'b3', kateb_name: 'bb3', image: 'img' },
];

// Définir une route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express ! makrem 2');
});
app.get('/picture', (req, res) => { 
    res.json(books);
});
app.get('/books', (req, res) => { 
    res.json(books);
});

app.post('/books', (req, res) => {
    res.send('Nouvel utilisateur créé');
    console.log(req.body , req.params , req.query);
});

app.put('/books/:id', (req, res) => {
    res.send(`books ${req.params.id} mis à jour`);
});

app.delete('/books/:id', (req, res) => {
    res.send(`books ${req.params.id} supprimé`);
});
app.get('/article/:id', (req, res) => {
    res.send(`Article ID : ${req.params.id}`);
});
//####################
app.get('/search', (req, res) => {
    res.json(req.query);
    // res.send(`Recherche : ${req.query.q}`);
});
app.post('/admin', (req, res) => {
    res.send(`admin ajouté : ${req.body.name}`);
});
//#####################
app.post('/submit', (req, res) => {
    // Accéder aux données du formulaire
    const book = req.body.book;
    const kateb_name = req.body.kateb_name;
    res.send(`book: ${book}, kateb_name: ${kateb_name}`);
});

// Configuration de Multer avec vérification d'extension
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Vérifier l'extension du fichier
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers JPG, PNG et PDF sont autorisés !"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Route d'upload
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("Fichier non accepté !");
    }
    res.send("Fichier uploadé avec succès !");
});

// Endpoint pour télécharger un fichier en envoyant son nom dans le body
app.get("/download", (req, res) => {
    const { filename } = req.query;  // Access filename via query params

    if (!filename) {
        return res.status(400).json({ error: "Nom du fichier requis !" });
    }

    const filePath = path.join(__dirname, "uploads", filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors du téléchargement." });
        }
    });
});


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Démarrer le serveur

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
