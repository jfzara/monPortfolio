
// Constantes
const CLE_PANIER = 'PanierLStorage';
const PREFIXE_CLE_PRIX = 'Prix';
const CLE_PRIX_EXISTANTS = 'PrixExistants';

// Variables globales
var PanierLStorage, cheminDimage, clePrix;

// Tableau des prix disponibles (simulé)
var prixDisponibles = generatePrixArray();

// Fonction pour récupérer le panier depuis le local storage
function getPanier() {
    var panierEnJSON = localStorage.getItem(CLE_PANIER);
    return panierEnJSON ? JSON.parse(panierEnJSON) : [];
}

// Fonction pour générer un tableau d'entiers représentant les prix disponibles
function generatePrixArray() {
    var minPrix = 150;
    var maxPrix = 1000;
    var nombreDarticles = 10;
    var prixArray = [];

    for (var i = 0; i < nombreDarticles; i++) {
        prixArray.push(getRandomInt(minPrix, maxPrix));
    }

    return prixArray;
}

// Fonction pour obtenir un entier aléatoire dans la plage spécifiée
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour mettre à jour le nombre d'articles dans le panier en haut à droite
function updatePanierCount() {
    var nombreDarticlesElement = document.getElementById('nombre_d_articles');
    var articlesAchetes = getPanier();
    var nombreDarticles = articlesAchetes.reduce(function (total, article) {
        return total + article.nombreAchats;
    }, 0);

    // Mise à jour du nombre d'articles dans le panier
    nombreDarticlesElement.innerText = nombreDarticles;

    // Mise à jour de l'apparence du panier en fonction du nombre d'articles
    if (nombreDarticles === 0) {
        nombreDarticlesElement.style.color = 'black';
        nombreDarticlesElement.style.fontSize = 'inherit';
    } else {
        nombreDarticlesElement.style.color = 'blue';
        nombreDarticlesElement.style.fontWeight = '600';
    }
}
// Fonction principale pour ajouter un article au panier
function addToCart() {
    
    cheminDimage = document.getElementById('modalImage').src;
    PanierLStorage = getPanier();

    // Utilise le prix disponible et le supprime du tableau
    var prixAttribue = prixDisponibles.shift();

    PanierLStorage.push({
        cheminDimage: cheminDimage,
        nombreAchats: 1,
        prix: prixAttribue
    });

    localStorage.setItem(CLE_PANIER, JSON.stringify(PanierLStorage));
    updatePanierCount();  // Met à jour le nombre d'articles dans le panier
   
}