// Tableau des compositions artistiques
var Compositions_Artistiques_Array = [
    { nom: 'Composition_Artistique1', prix: 500, url: 'bodypainting-4696543_1280.jpg' },
    { nom: 'Composition_Artistique2', prix: 300, url: 'art-2610961_1280.jpg' },
    { nom: 'Composition_Artistique3', prix: 800, url: 'fantasy-2767173_1280.jpg' },
    { nom: 'Composition_Artistique4', prix: 400, url: 'face-2889961_1280.jpg' },
    { nom: 'Composition_Artistique5', prix: 600, url: 'man-80101_1280.jpg' },
    { nom: 'Composition_Artistique6', prix: 350, url: 'paint-2985569_640.jpg' },
    { nom: 'Composition_Artistique7', prix: 900, url: 'silhouette-2589471_640.jpg' },
    { nom: 'Composition_Artistique8', prix: 250, url: 'woman-7697743_1280.jpg' },
    { nom: 'Composition_Artistique9', prix: 700, url: 'woman-5953619_1280.jpg' },
    { nom: 'Composition_Artistique10', prix: 450, url: 'umbrellas-1834286_640.jpg' },
];

// Variables globales
var currentIndex;
var quantityInput;

// Fonction pour ouvrir le modal avec les détails de l'image
function openModal(index) {
    var modalImage = document.getElementById('modalImage');
    var modalPrix = document.getElementById('modalPrix');
    quantityInput = document.getElementById('quantity'); // Déplacer la déclaration à un niveau supérieur
    var prixTotalElement = document.getElementById('prixTotal');
    
    // Mettez à jour l'image et le prix en fonction de l'index
    modalImage.src = 'Images/Compositions_artistiques/' + Compositions_Artistiques_Array[index].url;
    modalPrix.textContent = 'Prix: ' + Compositions_Artistiques_Array[index].prix + ' €';
    
    // Réinitialiser la quantité à 1
    quantityInput.value = 1;

    // Mettre à jour le prix total en fonction de la quantité
    updatePrixTotal();

    // Ajouter un auditeur d'événements pour le changement de quantité
    quantityInput.addEventListener('input', function () {
        updatePrixTotal();
    });

    currentIndex = index; // Définir currentIndex avec l'index actuel
}

// Fonction pour mettre à jour le prix total en fonction de la quantité
function updatePrixTotal() {
    var prixTotalElement = document.getElementById('prixTotal');
    
    // Récupérer la quantité et le prix unitaire
    var quantity = parseInt(quantityInput.value);
    var prixUnitaire = Compositions_Artistiques_Array[currentIndex].prix;

    // Calculer le prix total
    var prixTotal = quantity * prixUnitaire;

    // Mettre à jour l'affichage du prix total
    prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' €';
}

// Fonction pour ajouter un article au panier
function addToCart() {
    // Logique pour ajouter au panier (utilisez le localStorage)
    // Pour cet exemple, nous incrémentons le nombre d'articles dans le panier de la quantité sélectionnée
    var quantity = parseInt(quantityInput.value);
    
    var nombreArticles = localStorage.getItem('nombreArticles') || 0;
    nombreArticles = parseInt(nombreArticles) + quantity;
    localStorage.setItem('nombreArticles', nombreArticles);

    // Mettez à jour le nombre d'articles dans le panier
    updateCartCount();
}

// Fonction pour remettre à zéro le panier
function resetCart() {
    // Logique pour remettre à zéro le panier (utilisez le localStorage)
    localStorage.removeItem('nombreArticles');

    // Mettez à jour le nombre d'articles dans le panier
    updateCartCount();
}

// Fonction pour mettre à jour le prix total en fonction de la quantité
function updatePrixTotal() {
    var prixTotalElement = document.getElementById('prixTotal');

    // Assurez-vous que currentIndex est défini
    if (typeof currentIndex !== 'undefined' && Compositions_Artistiques_Array[currentIndex]) {
        // Récupérer la quantité et le prix unitaire
        var quantity = parseInt(quantityInput.value);
        var prixUnitaire = Compositions_Artistiques_Array[currentIndex].prix;

        // Calculer le prix total
        var prixTotal = quantity * prixUnitaire;

        // Mettre à jour l'affichage du prix total
        prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' $';
    } else {
        console.error('L\'index currentIndex est indéfini ou hors des limites du tableau.');
    }
}

// Fonction pour vider le panier
function viderPanier() {
    // Logique pour vider le panier (localStorage, etc.)
    localStorage.removeItem('nombreArticles');
    // Vous devrez également supprimer les articles spécifiques du panier
    // localStorage.removeItem('panier');
    
    // Mettez à jour le nombre d'articles dans le panier
    updateCartCount();

    // Vous pouvez également réinitialiser d'autres éléments du panier si nécessaire
    // document.getElementById('prixTotalPanier').textContent = '0 $';
    // document.getElementById('contenuPanier').innerHTML = '';
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    // Logique pour récupérer le nombre d'articles du panier (utilisez le localStorage)
    var nombreArticles = localStorage.getItem('nombreArticles') || 0;
    nombreArticles = parseInt(nombreArticles);

    // Mettez à jour l'affichage du nombre d'articles dans le panier
    var nombreArticlesElement = document.getElementById('nombre_d_articles');
    nombreArticlesElement.textContent = nombreArticles;

    // Mettez à jour le style en fonction du nombre d'articles
    if (nombreArticles > 0) {
        nombreArticlesElement.style.color = 'blue';
        nombreArticlesElement.style.fontWeight = '600';
    } else {
        nombreArticlesElement.style.color = 'black';
        nombreArticlesElement.style.fontWeight = 'normal';
    }
}

// Assurez-vous que la fonction d'initialisation est appelée après le chargement de la page
window.onload = function () {
  
    // Styliser le panier et appliquer un curseur de type pointer
    var panierElement = document.getElementById('lien_page_panier');
    panierElement.style.cursor = "pointer";

    var nombreArticlesTexte = document.getElementById("nombre_d_articles");
    nombreArticlesTexte.style.cursor = "pointer";

    // Mettez à jour le nombre d'articles dans le panier lors du chargement de la page
    updateCartCount();
};