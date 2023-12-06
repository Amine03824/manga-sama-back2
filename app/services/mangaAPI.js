const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

// Fonction principale asynchrone
async function mangaAPI(isbn) {
  // Vérifier si l'isbn est fourni
  if (!isbn) {
    console.error("Veuillez fournir un isbn en tant qu'argument.");
  }

  // Construire l'URL en utilisant l'isbn
  const url = `https://www.decitre.fr/livres/${isbn}.html`;

  // Fonction pour télécharger la page HTML de manière asynchrone
  async function downloadHTML() {
    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors du téléchargement de la page HTML :",
        error.message
      );
    }
  }

  // Fonction pour extraire les informations du livre
  async function extractBookInfo() {
    // Télécharger la page HTML de manière asynchrone
    const html = await downloadHTML();

    // Charger le HTML dans Cheerio
    const $ = cheerio.load(html);

    // Récupérer le titre du livre en excluant le contenu de la balise <span class="format">
    const title = $(".fp-top--main-info .product-title")
      .contents()
      .filter(function() {
        return this.nodeType === 3; // Filtrer les nœuds de texte
      })
      .text()
      .trim();

    // Fonction pour extraire le numéro de tome
    function extractVolumeNumber(title) {
      const match = title.match(/Tome (\d+)/);
      return match ? parseInt(match[1], 10) : null;
    }
    // Appeler la fonction pour extraire le numéro de tome
    const volumeNumber = extractVolumeNumber(title);

    // Fonction pour extraire les noms des auteurs
    function extractAuthors() {
      const authorElements = $(".authors.authors--main h2 a");
      const authors = authorElements
        .map(function() {
          return $(this).text().trim();
        })
        .get();

      return authors.join(", ");
    }
    // Appeler la fonction pour extraire les noms des auteurs
    const mainAuthor = extractAuthors();

    // Fonction pour télécharger l'image de couverture de la meilleure résolution possible
    async function downloadCoverImage(isbn, model) {
      const imageUrl = `https://products-images.di-static.com/image/cover/${isbn}-475x500-${model}.jpg`;

      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer"
        });

        // Chemin où tu veux sauvegarder l'image localement (ajuste le chemin selon ta structure de projet)
        const imagePath = path.join(
          __dirname,
          "../../public/images/",
          `${isbn}.jpg`
        );

        // Sauvegarde de l'image localement avec le nouveau nom
        fs.writeFileSync(imagePath, response.data, "binary");

        return imagePath.replace(__dirname, ""); // Retourne le chemin local de l'image avec le nouveau nom
      } catch (error) {
        console.error(
          `Erreur lors du téléchargement de l'image avec le modèle ${model}:`,
          error.message
        );
        return null; // Retourne null en cas d'erreur
      }
    }

    // Fonction pour récupérer l'image de couverture
    async function getCoverImage(isbn) {
      // Modèles d'image à essayer
      const modelsToTry = [2, 1]; // Change l'ordre des modèles

      // Essayer chaque modèle en séquence
      for (const model of modelsToTry) {
        const imagePath = path.join(
          __dirname,
          "../../public/images/",
          `${isbn}-${model}.jpg`
        );

        // Vérifier si l'image existe déjà localement
        if (fs.existsSync(imagePath)) {
          return `/images/${isbn}.jpg`; // Retourner le chemin local de l'image
        }

        const downloadedImagePath = await downloadCoverImage(isbn, model);
        if (downloadedImagePath !== null) {
          // Si l'image est téléchargée avec succès, retourner le chemin local de l'image
          return downloadedImagePath;
        }
      }

      // Si aucune image n'a été téléchargée avec succès, retourner null ou gérer selon vos besoins
      return null;
    }

    // Appeler la fonction pour récupérer l'image de couverture
    const localImageUrl = await getCoverImage(isbn);

    // Récupérer la description du livre
    const description = $("#resume .content").text().trim();

    // Récupérer la date de parution
    const publicationDate = $(
      '.information:contains("Date de parution") .value'
    )
      .text()
      .trim();

    // Extraire l'année de la date (supposant que le format est toujours dd/mm/yyyy)
    const year = publicationDate.split("/")[2];

    // Mapping des noms de catégories aux ID correspondants
    const categoryMapping = {
      Shonen: 1,
      Seinen: 2,
      Shojo: 3,
      Josei: 4,
      Kodomo: 5,
      Seijin: 6
    };
    // Récupérer le genre du livre avec le nouveau sélecteur
    const genre = $("#main_breadcrumb > ul > li:last-child > a > span")
      .text()
      .trim();

    // Utiliser une expression régulière pour extraire le dernier mot
    const lastWordMatch = genre.match(/\b(\w+)\b$/);
    const lastWord = lastWordMatch ? lastWordMatch[1] : ""; // Le dernier mot trouvé

    // Mettre la première lettre en majuscule
    const formattedGenre = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);

    // Trouver l'ID de la catégorie correspondant au genre dans le mapping
    const categoryId = categoryMapping[formattedGenre];
    // Condition pour gérer le cas où la catégorie n'est pas détectée
    if (categoryId === undefined) {
      console.error("Catégorie non reconnue :", formattedGenre);
      return null;
    }
    // Retourner un objet contenant toutes les informations du livre
    return {
      code_isbn: parseInt(isbn),
      title,
      volume: parseInt(volumeNumber),
      year_publication: parseInt(year),
      author: mainAuthor,
      description,
      cover_url: localImageUrl,
      category_id: categoryId
    };
    
  }

  // Exemple d'utilisation de la fonction pour extraire les informations du livre
  const extractedBookInfo = await extractBookInfo();
  return  extractedBookInfo;
  // Afficher les informations du livre dans la console
  // console.log("Informations du livre :", extractedBookInfo);
}

module.exports = {
  mangaAPI
};
