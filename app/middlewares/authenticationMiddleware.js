// Middleware d'authentification DESACTIVÉ
const authenticateMiddleware = (request, response, next) => {
  console.log("⚠️ Middleware d'authentification désactivé - Passage autorisé");

  // On simule un utilisateur connecté pour que le reste de l'app fonctionne
  request.user = {
    userId: 1, // Change l'ID si besoin pour tes tests
    role: 2, // On met le rôle admin par défaut pour tout autoriser
  };

  next();
};

// Middleware propriétaire article DESACTIVÉ
const articleOwnerMiddleware = async (request, response, next) => {
  console.log("⚠️ Middleware articleOwner désactivé");
  next();
};

// Middleware propriétaire compte utilisateur DESACTIVÉ
const userOwnerMiddleware = async (request, response, next) => {
  console.log("⚠️ Middleware userOwner désactivé");
  next();
};

// Middleware des rôles DESACTIVÉ
const roleMiddleware = (request, response, next) => {
  console.log("⚠️ Middleware des rôles désactivé");
  next();
};

module.exports = {
  authenticateMiddleware,
  articleOwnerMiddleware,
  userOwnerMiddleware,
  roleMiddleware,
};
