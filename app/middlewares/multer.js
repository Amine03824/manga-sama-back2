const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Fonction pour définir la destination dynamique
const dynamicDestination = (subfolder) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, `../../public/uploads/${subfolder}`));
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(8, (err, buf) => {
        if (err) return cb(err);

        // Ajouter l'extension au nom généré aléatoirement
        const filename = buf.toString('hex') + path.extname(file.originalname);

        cb(null, filename);
      });
    },
  });
};

// Middleware Multer pour les images d'utilisateurs
const uploadUser = multer({
  storage: dynamicDestination('users'),
  fileFilter: function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non pris en charge'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite la taille du fichier à 5 Mo
  },
}).single('image');

// Middleware Multer pour les images d'articles
const uploadArticle = multer({
  storage: dynamicDestination('articles'),
  fileFilter: function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non pris en charge'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite la taille du fichier à 5 Mo
  },
}).single('image');

module.exports = { uploadUser, uploadArticle };
