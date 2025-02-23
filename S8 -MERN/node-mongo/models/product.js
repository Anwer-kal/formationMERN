const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],  // Champ requis avec message d'erreur personnalisé
    minlength: [3, 'Name must be at least 3 characters long'],  // Validation de longueur minimale
    maxlength: [100, 'Name cannot be longer than 100 characters'],  // Validation de longueur maximale
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative'],  // Validation de valeur minimale
  },
  description: {
    type: String,
    default: 'No description provided',  // Valeur par défaut si aucun texte n'est fourni
  },
  inStock: {
    type: Boolean,
    default: true,  // Valeur par défaut
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Valeur par défaut: date actuelle
  },
  categories: {
    type: [String],  // Tableau de chaînes de caractères
    enum: ['Electronics', 'Clothing', 'Food', 'Furniture'],  // Limite les valeurs possibles du tableau
  },
  ratings: {
    type: Number,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);  // Validation personnalisée pour vérifier que l'URL commence par http:// ou https://
      },
      message: props => `${props.value} is not a valid URL`,  // Message d'erreur personnalisé
    },
  },
  tags: {
    type: [String],  // Tableau de chaînes de caractères
    default: [],  // Valeur par défaut: tableau vide
  },
  dimensions: {
    type: Map,
    of: Number,  // Utilisation de Map pour stocker des paires clé-valeur
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,  // Référence à un autre document (par exemple, un fabricant)
    ref: 'Manufacturer',  // Nom du modèle auquel cet ID fait référence
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
