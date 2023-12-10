// Identifiant de l'élément HTML de la liste du panier
var panierListeElement = document.getElementById('panier-liste');

// Identifiant de l'élément HTML pour afficher le total
var totalPrixElement = document.getElementById('total-prix');

// Fonction pour mettre à jour l'affichage du panier
function updatePanier() {
  // Récupérer la liste d'articles depuis le Local Storage
  var panier = JSON.parse(localStorage.getItem('cart')) || [];

  // Vider le contenu actuel de la liste du panier
  panierListeElement.innerHTML = '';

  // Variables pour calculer le total
  var total = 0;

  // Parcourir chaque article dans le panier
  panier.forEach(function (article) {
    // Assurez-vous que les propriétés nécessaires existent (nom, quantite, prix)
    if (article.hasOwnProperty('nom') && article.hasOwnProperty('quantite') && article.hasOwnProperty('prix')) {
      // Créer un élément de liste pour chaque article
      var listItem = document.createElement('li');
      listItem.textContent = article.nom + ' x ' + article.quantite + ' - ' + article.prix * article.quantite + ' €';

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
      total += article.prix * article.quantite;
    } else {
      console.error('Article mal formaté dans le panier:', article);
    }
  });

  // Mettre à jour l'affichage du total
  totalPrixElement.textContent = 'Total : ' + total.toFixed(2) + ' €';

  // Ajouter une console.log pour voir les articles dans la console
  console.log(panier);
}

// Fonction pour supprimer un article du panier
function removeFromPanier(article) {
  // Récupérer la liste d'articles depuis le Local Storage
  var panier = JSON.parse(localStorage.getItem('cart')) || [];

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
    localStorage.setItem('cart', JSON.stringify(panier));

    // Mettre à jour l'affichage du panier
    updatePanier();
  }
}

// Fonction pour valider l'achat (checkout)
function validerAchat() {
  // Ajoutez ici la logique pour valider l'achat, par exemple, vider le panier
  localStorage.removeItem('cart');

  // Mettre à jour l'affichage du panier
  updatePanier();
}

// Fonction pour vider le panier
function viderPanier() {
  // Supprimez le panier du Local Storage
  localStorage.removeItem('cart');

  // Mettez à jour l'affichage du panier
  updatePanier();
}

// Appel à updatePanier lors du chargement de la page
window.onload = function () {
  updatePanier();
};


