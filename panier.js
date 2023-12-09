// Fonction d'initialisation appelée après le chargement de la page
window.onload = function () {
  // Mettez à jour le panier lors du chargement de la page
  updatePanier();
};

// Fonction pour mettre à jour l'affichage du panier
function updatePanier() {
  // Récupérer la liste d'articles depuis le Local Storage
  var panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Sélectionner l'élément de la liste du panier
  var panierListeElement = document.getElementById('panier-liste');

  // Vider le contenu actuel de la liste du panier
  panierListeElement.innerHTML = '';

  // Variables pour calculer le total
  var total = 0;

  // Parcourir chaque article dans le panier
  panier.forEach(function (article) {
    // Créer un élément de liste pour chaque article
    var listItem = document.createElement('li');
    listItem.textContent = article.nom + ' x ' + article.quantite + ' - ' + article.prixTotal + ' €';

    // Ajouter un bouton pour supprimer l'article
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.addEventListener('click', function () {
      removeFromPanier(article);
    });

    // Ajouter le bouton de suppression à l'élément de la liste
    listItem.appendChild(deleteButton);

    // Ajouter l'élément de la liste au panier
    panierListeElement.appendChild(listItem);

    // Mettre à jour le total
    total += article.prixTotal;
  });

  // Mettre à jour l'affichage du total
  var totalPrixElement = document.getElementById('total-prix');
  totalPrixElement.textContent = 'Total : ' + total + ' €';
}

// Fonction pour supprimer un article du panier
function removeFromPanier(article) {
  // Récupérer la liste d'articles depuis le Local Storage
  var panier = JSON.parse(localStorage.getItem('panier')) || [];

  // Trouver l'index de l'article dans le panier
  var index = panier.findIndex(function (item) {
    return item.nom === article.nom;
  });

  // Si l'article est trouvé, le supprimer
  if (index !== -1) {
    // Mettre à jour la quantité dans le tableau et le total
    panier[index].quantite--;

    // Si la quantité atteint 0, supprimer complètement l'article
    if (panier[index].quantite <= 0) {
      panier.splice(index, 1);
    }

    // Mettre à jour le Local Storage
    localStorage.setItem('panier', JSON.stringify(panier));

    // Mettre à jour l'affichage du panier
    updatePanier();
  }
}

// Fonction pour valider l'achat (checkout)
function validerAchat() {
  // Ajoutez ici la logique pour valider l'achat, par exemple, vider le panier
  localStorage.removeItem('panier');

  // Mettre à jour l'affichage du panier
  updatePanier();
}

// Fonction pour vider le panier
function viderPanier() {
  // Supprimez le panier du Local Storage
  localStorage.removeItem('panier');

  // Mettez à jour l'affichage du panier
  updatePanier();
}