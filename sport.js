// Tableau des images
var Sport_Array = [
    { nom: 'Sport1', prix: 500, url: 'bodypainting-4696543_1280.jpg' },
    { nom: 'Sport2', prix: 300, url: 'art-2610961_1280.jpg' },
    { nom: 'Sport3', prix: 800, url: 'fantasy-2767173_1280.jpg' },
    { nom: 'Sport4', prix: 400, url: 'face-2889961_1280.jpg' },
    { nom: 'Sport5', prix: 600, url: 'man-80101_1280.jpg' },
    { nom: 'Sport6', prix: 350, url: 'paint-2985569_640.jpg' },
    { nom: 'Sport7', prix: 900, url: 'silhouette-2589471_640.jpg' },
    { nom: 'Sport8', prix: 250, url: 'woman-7697743_1280.jpg' },
    { nom: 'Sport9', prix: 700, url: 'woman-5953619_1280.jpg' },
    { nom: 'Sport10', prix: 450, url: 'umbrellas-1834286_640.jpg' },
];

// Variables globales
var currentIndex;
var quantityInput = document.getElementById('quantity');



// Fonction pour initialiser le panier à partir du localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart);
}

// Fonction pour mettre à jour le panier dans le localStorage
function updateCartStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
}



 

// Fonction pour ouvrir le modal avec les détails de l'image
function openModal(index) {
    var modalImage = document.getElementById('modalImage');
    var modalPrix = document.getElementById('modalPrix');
    var prixTotalElement = document.getElementById('prixTotal');

    // Mise à jour de l'image et du prix en fonction de l'index (tableau Sport_Array )
    modalImage.src = 'Images/Sport/' + Sport_Array[index].url;
    modalPrix.textContent = 'Prix: ' + Sport_Array[index].prix + ' $';

    // La quantité est par défaut mise à 1
    quantityInput.value = 1;

    // Définir currentIndex avec l'index actuel
    currentIndex = index;

    // Mise à jour du prix total en fonction de la quantité d'articles (produit prix * quantité)
    updatePrixTotal();
    
    // Auditeur d'événements pour le changement de quantité (input de l'utilisateur)
    quantityInput.addEventListener('input', function () {
        updatePrixTotal(); // Appel de la fonction à l'intérieur de l'auditeur d'événements
    });
}

// Fonction pour afficher et mettre à jour le prix total en fonction de la quantité

function updatePrixTotal() {

    var prixTotalElement = document.getElementById('prixTotal');
    
    // Récupérer la quantité et le prix unitaire dans le tableau (Sport_Array)
    var quantity = parseInt(quantityInput.value);
    var prixUnitaire = Sport_Array[currentIndex].prix;

    // Calculer le prix total
    var prixTotal = quantity * prixUnitaire;

    // Mettre à jour l'affichage du prix total
    prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' €';
}


// Fonction pour ajouter un article au panier
function addToCart() {

   
    var quantity = parseInt(quantityInput.value);

    // Récupérer le panier depuis le localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ajouter l'article avec les détails actuels
    cart.push({
        nom: Sport_Array[currentIndex].nom,
        prix: Sport_Array[currentIndex].prix,
        quantite: quantity,
        imageUrl: Sport_Array[currentIndex].url
    });

    // Mettre à jour le panier dans le localStorage
    updateCartStorage(cart);
}


// Fonction pour remettre à zéro le panier

function resetCart() {
    // Supprimer le panier du localStorage
    localStorage.removeItem('cart');

    // Mise à jour du nombre d'articles dans le panier
    updateCartCount([]);
}


// Fonction pour mettre à jour le prix total en fonction de la quantité

function updatePrixTotal() {
    var prixTotalElement = document.getElementById('prixTotal');

    // Vérifier que currentIndex est défini
    if (typeof currentIndex !== 'undefined' && Sport_Array[currentIndex]) {
        // Récupérer la quantité et le prix unitaire
        var quantity = parseInt(quantityInput.value);
        var prixUnitaire = Sport_Array[currentIndex].prix;

        // Calculer le prix total
        var prixTotal = quantity * prixUnitaire;

        // Mise à jour de l'affichage du prix total
        prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' $';
    } else {
        console.error('L\'index currentIndex est indéfini ou hors des limites du tableau.');
    }
}


// Fonction pour vider le panier
function viderPanier() {
    // Supprimer le panier du localStorage
    localStorage.removeItem('cart');

    // Mise à jour du nombre d'articles dans le panier
    updateCartCount([]);
}


// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount(cart) {
    // Mettre à jour l'affichage du nombre d'articles dans le panier
    var cartElement = document.getElementById('nombre_d_articles');
    var cart = cart.reduce((total, item) => total + item.quantite, 0);
    cartElement.textContent = cart;

    // Mise à jour du style en fonction du nombre d'articles
    if (cart > 0) {
        cartElement.style.color = 'blue';
        cartElement.style.fontWeight = '600';
    } else {
        cartElement.style.color = 'black';
        cartElement.style.fontWeight = 'normal';
    }
}

// Fonction d'initialisation
window.onload = function () {
    var panierElement = document.getElementById('lien_page_panier');
    panierElement.style.cursor = "pointer";

    var cartTexte = document.getElementById("nombre_d_articles");
    cartTexte.style.cursor = "pointer";
};