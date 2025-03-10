const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 8000;

// Vérifier si le dossier "uploads/" existe, sinon le créer
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Liste des livres (simulation de base de données en mémoire)
const books = [
    { id: 1, title: "Cosette", author: "Victor Hugo", imageUrl: "1739724773379.jpg" },
    { id: 2, title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", imageUrl: "1739726440010.jpeg" },
    { id: 3, title: "Harry Potter", author: "J.K. Rowling", imageUrl: "1739728151151.jpg" }
];

// Configuration de Multer pour l'upload des images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Seuls JPG et PNG sont autorisés !"), false);
};

const upload = multer({ storage, fileFilter });

// Routes de l'API

// Route d'accueil
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API de gestion des livres !");
});

// Obtenir tous les livres
app.get("/books", (req, res) => {
    res.json(books);
});

// Ajouter un livre
app.post("/books", (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ error: "Titre et auteur requis !" });
    }

    const newBook = { 
        id: books.length + 1, 
        title, 
        author, 
        imageUrl: "" 
    };
    books.push(newBook);
    res.status(201).json({ message: "Livre ajouté avec succès", book: newBook });
});

// Modifier un livre
app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = books.find((b) => b.id == id);

    if (!book) {
        return res.status(404).json({ error: "Livre non trouvé" });
    }

    book.title = title || book.title;
    book.author = author || book.author;

    res.json({ message: `Livre ${id} mis à jour`, book });
});

// Supprimer un livre
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((b) => b.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Livre non trouvé" });
    }

    books.splice(index, 1);
    res.json({ message: `Livre ${id} supprimé` });
});

// Upload d'une image pour un livre spécifique
app.post("/books/:id/upload", upload.single("cover"), (req, res) => {
    const { id } = req.params;
    const book = books.find((b) => b.id == id);

    if (!book) {
        return res.status(404).json({ error: "Livre non trouvé" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "Aucune image envoyée" });
    }

    book.imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    res.json({ message: "Image ajoutée avec succès", book });
});

// Télécharger une image
app.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ error: "Image non trouvée" });
    }
});

// Servir les fichiers statiques pour les images
app.use("/uploads", express.static(uploadPath));


app.get("/pictures", (req, res) => {
    const booksImages = books.map(book => ({
        name: `http://localhost:8000/images/${book.imageUrl}` 
    }));

    console.log("Images envoyées:", booksImages);
    res.json({ images: booksImages });
});





// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur de gestion des livres sur http://localhost:${PORT}`);
});
