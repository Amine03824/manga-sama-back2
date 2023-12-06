const mangaCoverLocation = ('../../public/images');
const path = require('path');

const imageController = {
  // Renvoie une cover de manga du dossier public par son ID
  sendOneCoverById : async (request, response) =>{
    try {
      const { id } = request.params;
      const mangaCover= path.join(__dirname,mangaCoverLocation,`${id}.jpg`);
      if (!mangaCover) {
        // Aucune image trouvée, renvoyer une réponse 404 Not Found
        return response.json({
          status: 404,
          success: false,
          message: "Aucune couverture trouvée pour l'image demandée"
        });
      }
      return response.sendFile(mangaCover);
    } catch (error) {
      console.log(error);
      return response.json({
        status: 500,
        success: false,
        error: {
          message: error.toString()
        }
      });
    }
  },
  
}; 



module.exports = imageController;
