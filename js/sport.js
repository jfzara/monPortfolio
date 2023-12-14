// Tableau des images
var Sport_Array = [
    { nom: 'Sport1', prix: 500, url: 'baseball-7985433_1280.jpg' },
    { nom: 'Sport2', prix: 300, url: 'basketball-95607_1280.jpg' },
    { nom: 'Sport3', prix: 800, url: 'swimmers-79592_1280.jpg' },
    { nom: 'Sport4', prix: 400, url: 'surfing-926822_1280.jpg' },
    { nom: 'Sport5', prix: 600, url: 'superbike-930715_1280.jpg' },
    { nom: 'Sport6', prix: 350, url: 'stadium-931975_1280.jpg' },
    { nom: 'Sport7', prix: 900, url: 'rugby-78193_1280.jpg' },
    { nom: 'Sport8', prix: 250, url: 'referee-1488156_1280.jpg' },
    { nom: 'Sport9', prix: 700, url: 'rugby-78193_1280.jpg' },
    { nom: 'Sport10', prix: 450, url: 'kettlebell-3293475_1280.jpg' },
];

var currentIndex;
var quantityInput = document.getElementById('quantity');
var prixTotalElement = document.getElementById('prixTotal');

// Variable globale pour le nombre total d'articles
var nombreTotalArticles = 0;

// Fonction pour mettre à jour l'apparence du bouton en fonction du nombre d'articles dans sport.js
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

function updateCartStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(cart);
}

function openModal(index) {
  var modalImage = document.getElementById('modalImage');
  var modalPrix = document.getElementById('modalPrix');

  modalImage.src = '../images/Sport/' + Sport_Array[index].url;
  modalPrix.textContent = 'Prix: ' + Sport_Array[index].prix + ' $';

  quantityInput.value = 1;
  currentIndex = index;
  updatePrixTotal();

  quantityInput.addEventListener('input', function () {
    updatePrixTotal();
  });
}

function updatePrixTotal() {
  if (typeof currentIndex !== 'undefined' && Sport_Array[currentIndex]) {
    var quantity = parseInt(quantityInput.value);
    var prixUnitaire = Sport_Array[currentIndex].prix;

    var prixTotal = quantity * prixUnitaire;

    prixTotalElement.textContent = 'Prix total: ' + prixTotal + ' $';
  } else {
    console.error('L\'index currentIndex est indéfini ou hors des limites du tableau.');
  }
}

function addToCart() {
  var quantity = parseInt(quantityInput.value);
  var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Vérifier si la quantité dépasse 99, affiche un message et empêche l'ajout
if (quantity > 99) {
  alert('Maximum 99 articles!');
  return;
}
  cart.push({
    nom: Sport_Array[currentIndex].nom,
    prix: Sport_Array[currentIndex].prix,
    quantite: quantity,
    imageUrl: Sport_Array[currentIndex].url
  });

  updateCartStorage(cart);
  updateButtonAppearance(cart.length);
}

function resetCart() {
  localStorage.removeItem('cart');
  updateCartCount([]);
}

function viderPanier() {
  localStorage.removeItem('cart');
  updateCartCount([]);
  updateButtonAppearance(0);
}

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

window.addEventListener('load', function () {
  var iconePanier = document.getElementById('lien_page_panier');
  iconePanier.style.cursor = "pointer";
  nbrArticles.style.cursor = "pointer";

  // Appeler loadCart après avoir défini les fonctions nécessaires
  loadCart();
});