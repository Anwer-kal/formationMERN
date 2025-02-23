const express = require('express');


const multer = require("multer");
const path = require("path");

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//pour utlise backend a frontend (public)
const cors = require('cors');
const { error } = require('console');
app.use(cors());  // Permet les requêtes CORS depuis n'importe quelle origine

// Définir le port
const PORT = 8000;
//users ce une base donne 
const livres=[
  {id :1 , titre:'lombre du vent ',autre:'ruiz zafon', nombrePage:'250',image:'h1.jpg'},
  {id :2 , titre:'melange ',autre:'ammar mahjoubi', nombrePage:'300',image:'h3.jpg'},
  {id :3 , titre:'li-loup',autre:'ahmed ajemi', nombrePage:'50',image:'h2.jpg'},
]

// Définir une route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Express ! malek');
});

//envoye de donne avec type get
app.get('/livres', (req, res) => { 
    console.log("Livres envoyés :", livres); // Vérifie les données côté backend
    res.json(livres);
});
    // ajoute de donne avec post 
     app.post('/livres', (req, res) => {
        console.log(req.body, req.params ,req.query) //cette ligne pour envoye de donne 
        res.send('Nouvel livre créé');
    });
//Mettre à jour des données avec put
    app.put('/livres/:id', (req, res) => {
        res.send(`livre ${req.params.id} mis à jour`);// id ce t'a dire params
    });
// pour supprime (toujour dans params si type delete ou put )
    app.delete('/livres/:id', (req, res) => {
        res.send(`livre ${req.params.id} supprimé`);
    });
    app.get('/article/:id', (req, res) => {
        res.send(`Article ID : ${req.params.id}`);
    });
    app.get('/search', (req, res) => {
        res.json(req.query);
    });
    app.post('/admin', (req, res) => {
        res.send(`admin ajouté : ${req.body.name}`);
    });

    app.post('/submit', (req, res) => {
        // Accéder aux données du formulaire
        const titre = req.body.titre;
        const autre = req.body.autre;
        const nombrePage=req.body.nombrePage;
        const image=req.body.image;
        res.send(`Title:${titre},Other:${autre},Number of Pages:${nombrePage},Picture:${image}`)
    });


//pour ajout de documont avec form-data


// Configuration de Multer avec vérification d'extension
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Vérifier l'extension du fichier
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf","image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers JPG, PNG et PDF sont autorisés !"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Route d'upload
app.post("/uploads", upload.single("file"), (req, res) => {
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

//configuré Express pour servir les fichiers statiques 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Démarrer le serveur

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});




















