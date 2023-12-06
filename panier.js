
articlesAchetes.forEach(function (articleUrl) {
    // Récupération du prix depuis le stockage local
    var articlePrix = parseFloat(localStorage.getItem('Prix' + articleUrl));
  
    // Création d'un élément de liste minimaliste pour chaque article
    var listItem = document.createElement('li');
    listItem.classList.add('article-list-item'); // Ajout d'une classe pour le style CSS
  
    // Ajout de l'image de l'article (remplacez 'CheminImage' par le chemin réel)
    var imageElement = document.createElement('img');
    imageElement.src = 'CheminImage/' + articleUrl;
    imageElement.alt = 'Image de l\'article';
    listItem.appendChild(imageElement);
  
    // Ajout du nombre d'achats à droite de l'image
    var nombreAchatsElement = document.createElement('span');
    nombreAchatsElement.textContent = ' x ' + articlesAchetes.filter(item => item === articleUrl).length;
    listItem.appendChild(nombreAchatsElement);
  
    // Création d'un bouton de suppression pour chaque article
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.onclick = function () {
      // Suppression de l'article du tableau et du stockage local
      var index = articlesAchetes.indexOf(articleUrl);
      if (index !== -1) {
        articlesAchetes.splice(index, 1);
        localStorage.setItem('ArticlesAchetes', JSON.stringify(articlesAchetes));
        // Suppression de l'élément de liste du panier
        panierListe.removeChild(listItem);
        // Mise à jour du prix total
        updateTotalPrix();
      }
    };
  
    // Ajout du bouton de suppression à l'élément de liste
    listItem.appendChild(deleteButton);
  
    // Ajout de l'élément de liste au panier
    panierListe.appendChild(listItem);
  });