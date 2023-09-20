const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({ // configure le chemin et le nom pour les fichiers entrants
  destination: (req, file, callback) => {
    callback(null, 'images'); // on enregistre dans le dossier images
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // on utilise le nom d'origine et on remplace les espaces par des underscore
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image'); // on lui envoie le storage et on inque qu'on gère que les fichiers image