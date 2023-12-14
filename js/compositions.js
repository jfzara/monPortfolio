// Tableau des images
var Compositions_Array = [
  { nom: 'Composition1', prix: 500, url: 'bodypainting-4696543_1280.jpg' },
  { nom: 'Composition2', prix: 300, url: 'art-2610961_1280.jpg' },
  { nom: 'Composition3', prix: 800, url: 'fantasy-2767173_1280.jpg' },
  { nom: 'Composition4', prix: 400, url: 'face-2889961_1280.jpg' },
  { nom: 'Composition5', prix: 600, url: 'man-80101_1280.jpg' },
  { nom: 'Composition6', prix: 350, url: 'paint-2985569_640.jpg' },
  { nom: 'Composition7', prix: 900, url: 'silhouette-2589471_640.jpg' },
  { nom: 'Composition8', prix: 250, url: 'woman-7697743_1280.jpg' },
  { nom: 'Composition9', prix: 700, url: 'woman-5953619_1280.jpg' },
  { nom: 'Composition10', prix: 450, url: 'umbrellas-1834286_640.jpg' },
];

// Variables globales
var currentIndex;
var quantityInput = document.getElementById('quantity');
var prixTotalElement = document.getElementById('prixTotal');
var nbrArticles = document.getElementById('nombre_d_articles');
// Variable globale pour le nombre total d'articles
var nombreTotalArticles = 0;

// Fonction pour mettre à jour l'apparence du bouton en fonction du nombre d'articles dans compositions.js
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

  modalImage.src = '../images/Compositions/' + Compositions_Array[index].url;
  modalPrix.textContent = 'Prix: ' + Compositions_Array[index].prix + ' $';

  quantityInput.value = 1;
  currentIndex = index;
  updatePrixTotal();

  quantityInput.addEventListener('input', function () {
      updatePrixTotal();
  });
}

function updatePrixTotal() {
  if (typeof currentIndex !== 'undefined' && Compositions_Array[currentIndex]) {
      var quantity = parseInt(quantityInput.value);
      var prixUnitaire = Compositions_Array[currentIndex].prix;

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
      nom: Compositions_Array[currentIndex].nom,
      prix: Compositions_Array[currentIndex].prix,
      quantite: quantity,
      imageUrl: Compositions_Array[currentIndex].url
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
