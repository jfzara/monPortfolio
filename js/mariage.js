// Tableau des images
var Mariage_Array = [
    { nom: 'Mariage0', prix: 500, url: 'mariage0.jpg' },
    { nom: 'Mariage1', prix: 300, url: 'mariage1.jpg' },
    { nom: 'Mariage2', prix: 800, url: 'mariage2.jpg' },
    { nom: 'Mariage3', prix: 400, url: 'mariage3.jpg' },
    { nom: 'Mariage4', prix: 600, url: 'mariage4.jpg' },
    { nom: 'Mariage5', prix: 350, url: 'mariage5.jpg' },
    { nom: 'Mariage6', prix: 900, url: 'mariage6.jpg' },
    { nom: 'Mariage7', prix: 250, url: 'mariage7.jpg' },
    { nom: 'Mariage8', prix: 700, url: 'mariage8.jpg' },
    { nom: 'Mariage9', prix: 450, url: 'mariage9.jpg' },
];

var currentIndex;
var quantityInput = document.getElementById('quantity');
var prixTotalElement = document.getElementById('prixTotal');

// Variable globale pour le nombre total d'articles
var nombreTotalArticles = 0;

// Fonction pour mettre à jour l'apparence du bouton en fonction du nombre d'articles dans mariage.js
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

  modalImage.src = '../images/mariage/' + Mariage_Array[index].url;
  modalPrix.textContent = 'Prix: ' + Mariage_Array[index].prix + ' $';

  quantityInput.value = 1;
  currentIndex = index;
  updatePrixTotal();

  quantityInput.addEventListener('input', function () {
    updatePrixTotal();
  });
}

function updatePrixTotal() {
  if (typeof currentIndex !== 'undefined' && Mariage_Array[currentIndex]) {
    var quantity = parseInt(quantityInput.value);
    var prixUnitaire = Mariage_Array[currentIndex].prix;

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
    nom: Mariage_Array[currentIndex].nom,
    prix: Mariage_Array[currentIndex].prix,
    quantite: quantity,
    imageUrl: Mariage_Array[currentIndex].url
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
