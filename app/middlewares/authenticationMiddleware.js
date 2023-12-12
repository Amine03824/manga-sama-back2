// Importe le module jsonwebtoken
const jwt = require('jsonwebtoken');
// Importe du module jwtConfig
const jwtConfig = require('../config/jwt');

// Middleware d'authentification
const authenticateMiddleware = (request, response, next) => {
  // Récupérer le token JWT depuis le header Authorization
  const token = request.header('Authorization');
  console.log("le token récupéré dans le mdidleware "+ token );
  // Vérifier si le token est présent
  if (!token) {
    console.log("le token est manquant");
    return response.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }
  
  try {
    console.log("je suis dans le try j'essaye de vérifier " );
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, jwtConfig.jwtSecretKey);
    console.log("le token décodé "+ decoded);
    // Ajouter les informations de l'utilisateur au request pour une utilisation ultérieure
    request.user = decoded;
  
    // Appeler next() pour passer au middleware suivant ou à la route protégée
    next();
  } catch (error) {
    // En cas d'erreur de vérification du token
    return response.status(401).json({ message: 'Accès non autorisé. Token invalide.' });
  }
};

module.exports = authenticateMiddleware;