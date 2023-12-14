// Tableau des images de la collection "Nature"
var Nature_Array = [
  { nom: 'Nature0', prix: 500, url: 'nature0.jpg' },
  { nom: 'Nature1', prix: 300, url: 'nature1.jpg' },
  { nom: 'Nature2', prix: 800, url: 'nature2.jpg' },
  { nom: 'Nature3', prix: 400, url: 'nature3.jpg' },
  { nom: 'Nature4', prix: 600, url: 'nature4.jpg' },
  { nom: 'Nature5', prix: 350, url: 'nature5.jpg' },
  { nom: 'Nature6', prix: 900, url: 'nature6.jpg' },
  { nom: 'Nature7', prix: 250, url: 'nature7.jpg' },
  { nom: 'Nature8', prix: 700, url: 'nature8.jpg' },
  { nom: 'Nature9', prix: 450, url: 'nature9.jpg' },
];

// Variables globales
var currentIndex;
var quantityInput = document.getElementById('quantity');
var prixTotalElement = document.getElementById('prixTotal');

// Variable globale pour le nombre total d'articles
var nombreTotalArticles = 0;

// Fonction pour mettre à jour l'apparence du bouton en fonction du nombre d'articles dans le panier "Nature"
function updateButtonAppearance(nombreTotalArticles) {
const viderPanierBtn = document.getElementById('viderPanier');
const panierVideBtn = document.getElementById('panierVideBtn');

if (nombreTotalArticles > 0) {
  viderPanierBtn.textContent = 'Vider le panier';
  viderPanierBtn.disabled = false;
  viderPanierBtn.classList.remove('btnBlack');
  viderPanierBtn.style = 'display: inline-block;';
  panierVideBtn.style = 'display: none;';
} else {
  viderPanierBtn.style = 'display: none;';
  panierVideBtn.style = 'display: inline-block;';
}
}

// Fonction pour initialiser le panier à partir du localStorage
function loadCart() {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount(cart);
updateButtonAppearance(cart.length);
}

// Fonction pour mettre à jour le stockage du panier dans le localStorage
function updateCartStorage(cart) {
localStorage.setItem('cart', JSON.stringify(cart));
updateCartCount(cart);
}

// Fonction pour ouvrir la fenêtre modale avec les détails de l'article sélectionné
function openModal(index) {
var modalImage = document.getElementById('modalImage');
var modalPrix = document.getElementById('modalPrix');

modalImage.src = '../images/nature/' + Nature_Array[index].url;
modalPrix.textContent = 'Prix: ' + Nature_Array[index].prix + ' $';

quantityInput.value = 1;
currentIndex = index;
updatePrixTotal();

quantityInput.addEventListener('input', function () {
  updatePrixTotal();
});
}

// Fonction pour mettre à jour le prix total en fonction de la quantité sélectionnée
function updatePrixTotal() {
if (typeof currentIndex !== 'undefined' && Nature_Array[currentIndex]) {
  var quantity = parseInt(quantityInput.value);
  var prixUnitaire = Nature_Array[currentIndex].prix;

  var prixTotal = quantity * prixUnitaire;

  prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' $';
} else {
  console.error('L\'index currentIndex est indéfini ou hors des limites du tableau.');
}
}

// Fonction pour ajouter un article au panier
function addToCart() {
var quantity = parseInt(quantityInput.value);
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Vérifier si la quantité dépasse 99, affiche un message et empêche l'ajout
if (quantity > 99) {
  alert('Maximum 99 articles!');
  return;
}

cart.push({
  nom: Nature_Array[currentIndex].nom,
  prix: Nature_Array[currentIndex].prix,
  quantite: quantity,
  imageUrl: Nature_Array[currentIndex].url
});

updateCartStorage(cart);
updateButtonAppearance(cart.length);
}

// Fonction pour réinitialiser le panier
function resetCart() {
localStorage.removeItem('cart');
updateCartCount([]);
}

// Fonction pour vider le panier
function viderPanier() {
localStorage.removeItem('cart');
updateCartCount([]);
updateButtonAppearance(0);
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount(cart) {
var nbrArticles = document.getElementById('nombre_d_articles');
var totalQuantite = cart.reduce((total, item) => total + item.quantite, 0);
nbrArticles.textContent = totalQuantite;

// Condition pour ajuster la position si le nombre d'articles dépasse 9
if (totalQuantite > 9) {
  nbrArticles.style.position = 'absolute';
  nbrArticles.style.top = '28%';
  nbrArticles.style.left = '31%';
} else {
  // Remettre la position par défaut si le nombre d'articles est inférieur ou égal à 9
  nbrArticles.style.position = 'absolute';
  nbrArticles.style.top = '28%';
  nbrArticles.style.left = '37%';
}

if (totalQuantite > 0) {
  nbrArticles.style.color = 'rgb(49, 49, 199)';
  nbrArticles.style.fontWeight = '600';
} else {
  nbrArticles.style.color = 'black';
  nbrArticles.style.fontWeight = 'normal';
}
}

// Événement de chargement de la page
window.addEventListener('load', function () {
var iconePanier = document.getElementById('lien_page_panier');
iconePanier.style.cursor = "pointer";
nbrArticles.style.cursor = "pointer";

// Appeler loadCart après avoir défini les fonctions nécessaires
loadCart();
});