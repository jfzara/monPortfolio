// Tableau des images
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

var currentIndex;
var quantityInput = document.getElementById('quantity');
var prixTotalElement = document.getElementById('prixTotal');

// Fonction pour mettre à jour l'apparence du bouton en fonction du nombre d'articles
function updateButtonAppearance(nombreTotalArticles) {
    const viderPanierBtn = document.getElementById('viderPanier');

    if (nombreTotalArticles > 0) {
        // Si le panier n'est pas vide, afficher "Vider le panier" et le rendre actif
        viderPanierBtn.textContent = 'Vider le panier';
        viderPanierBtn.disabled = false;
        viderPanierBtn.classList.remove('btn-outline-danger');
        viderPanierBtn.classList.add('btn-danger');
    } else {
        // Si le panier est vide, afficher "Panier vide" et le rendre non cliquable
        viderPanierBtn.textContent = 'Panier vide';
        viderPanierBtn.disabled = true;
        viderPanierBtn.classList.remove('btn-danger');
        viderPanierBtn.classList.add('btn-outline-danger');
    }
}

// Fonction pour initialiser le panier à partir du localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart);

    // Mise à jour de l'apparence du bouton
    updateButtonAppearance(cart.length);
}

function updateCartStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(cart);
}

function openModal(index) {
    var modalImage = document.getElementById('modalImage');
    var modalPrix = document.getElementById('modalPrix');

    modalImage.src = 'Images/Compositions_Artistiques/' + Compositions_Artistiques_Array[index].url;
    modalPrix.textContent = 'Prix: ' + Compositions_Artistiques_Array[index].prix + ' $';

    quantityInput.value = 1;
    currentIndex = index;
    updatePrixTotal();

    quantityInput.addEventListener('input', function () {
        updatePrixTotal();
    });
}

function updatePrixTotal() {
    // Utiliser la variable globale prixTotalElement déclarée au début du script
    if (typeof currentIndex !== 'undefined' && Compositions_Artistiques_Array[currentIndex]) {
        var quantity = parseInt(quantityInput.value);
        var prixUnitaire = Compositions_Artistiques_Array[currentIndex].prix;

        var prixTotal = quantity * prixUnitaire;

        prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' $';
    } else {
        console.error('L\'index currentIndex est indéfini ou hors des limites du tableau.');
    }
}

function addToCart() {
    var quantity = parseInt(quantityInput.value);
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({
        nom: Compositions_Artistiques_Array[currentIndex].nom,
        prix: Compositions_Artistiques_Array[currentIndex].prix,
        quantite: quantity,
        imageUrl: Compositions_Artistiques_Array[currentIndex].url
    });

    quantityInput.value = quantity;
    updateCartStorage(cart);

     // Mise à jour de l'apparence du bouton
     updateButtonAppearance(cart.length);
}

function resetCart() {
    localStorage.removeItem('cart');
    updateCartCount([]);
}

function viderPanier() {
    localStorage.removeItem('cart');
    updateCartCount([]);
}

function updateCartCount(cart) {
    var cartElement = document.getElementById('nombre_d_articles');
    var cart = cart.reduce((total, item) => total + item.quantite, 0);
    cartElement.textContent = cart;

    if (cart > 0) {
        cartElement.style.color = 'rgb(49, 49, 199)';
        cartElement.style.fontWeight = '600';
    } else {
        cartElement.style.color = 'black';
        cartElement.style.fontWeight = 'normal';
    }
}

window.addEventListener('load', function () {
    var panierElement = document.getElementById('lien_page_panier');
    panierElement.style.cursor = "pointer";

    var cartTexte = document.getElementById("nombre_d_articles");
    cartTexte.style.cursor = "pointer";

    // Génération des éléments HTML pour les images
    var imagesContainer = document.querySelector('.row');

    Compositions_Artistiques_Array.forEach((composition, index) => {
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('col-md-4', 'col-lg-3', 'mb-4');

        var imageElement = document.createElement('img');
        imageElement.src = 'Images/Compositions_Artistiques/' + composition.url;
        imageElement.alt = composition.nom;
        imageElement.classList.add('img-fluid', 'img-thumbnail', 'cursor-pointer');
        imageElement.onclick = function () {
            openModal(index);
        };

        imageDiv.appendChild(imageElement);
        imagesContainer.appendChild(imageDiv);
    });
});
