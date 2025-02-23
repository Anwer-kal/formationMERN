const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//pour utlise backend a frontend (public)
const cors = require('cors');
app.use(cors());  // Permet les requêtes CORS depuis n'importe quelle origine
// Définir le port
const PORT = 8000;
// le donne de livre 
const livres=[
  {id :1 , titre:'lombre du vent ',autre:'ruiz zafon', nombrePage:'250',image:'h1.jpg'},
  {id :2 , titre:'melange ',autre:'ammar mahjoubi', nombrePage:'300',image:'h3.png'},
  {id :3 , titre:'li-loup',autre:'ahmed ajemi', nombrePage:'50',image:'h2.png'},


]

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
//envoye de donne 
app.get('/livres' ,(req,res)=>{
  res.json(livres);
 
});
//mettre a jour 
app.put('/livres/:id' ,(req,res)=>{
  res.send(`livre ${req.params.id} mise a jour`);
});
//ajoute de donne 
app.post('/livres' , (req,res)=>{
  res.send(req.body , req.params, req.query)
  res.send('nouvel livre crée');
});
//supprime de donne 
app.delete('/livres/:id', (req, res)=>{
  res.send(`livre ${req.params.id}`);
});
app.post('/admin' ,(req,res)=>{
  res.send(`admin ajouté :${req.body.name}`);
});
app.post('/submit' ,(req ,res)=>{
  const titre = req.body.titre;
  const autre = req.body.autre;
  const nombrePage=req.body.nombrePage;
  const image=req.body.image;
  res.send(`Title:${titre},Other:${autre},Number of Pages:${nombrePage},Picture:${image}`)
  
});
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter=(req,file,cb)=>{
  const allowedType=["image/jpeg", "image/png"];
  if(allowedType.includes(file.mimetype)){
    cb(null,true);
  }else{
    cb(new Error ("Seuls les fichiers JPG ,PNG !"), false);
  }
};
const upload= multer({storage, fileFilter});
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
      return res.status(400).send("Fichier non accepté !");
  }
  res.send("Fichier uploadé avec succès !");
});
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

