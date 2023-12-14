// Identifiants des éléments HTML
const panierListeElement = document.getElementById('panierListe');
const totalPrixElement = document.getElementById('totalPrix');
const nombreArticlesElement = document.getElementById('nombreArticles');

// Fonction pour déclencher un clignotement du bouton "Panier vide" 
function clignotementPanierVide() {
	const panierVideButton = document.getElementById('panierVide');
	panierVideButton.style.animation = 'none'; // Réinitialise l'animation
	setTimeout(() => {
		panierVideButton.style.animation = 'blinkAnimation 0.2s ease 3 2s '; //animation: name duration timing-function iteration-count delay;.
	}, 5000); // délai = 5000ms(5s)
}
// Fonction pour déclencher un clignotement du message de remerciement 
function clignotementRemerciement() {
	const remerciement = document.getElementById('msgRemerciement');
	remerciement.style.animation = 'none'; // Réinitialise l'animation
	setTimeout(() => {
		remerciement.style.animation = 'blinkAnimation 0.3s ease-in 2 '; // Redémarre l'animation après le délai
	}, 0.5); // Une petite attente pour assurer la réinitialisation
}

// Fonction pour vérifier la validité de la quantité
function isQuantityValid(quantity) {
	return quantity > 0 && quantity <= 99;
}

// Fonction pour créer un bouton avec du texte, gestionnaire d'événements, et classes optionnelles
function createButton(text, onClick, classNames = 'btn mx-2') {
	const button = document.createElement('button');
	button.textContent = text;
	button.classList.add(...classNames.split(' '));
	button.addEventListener('click', onClick);

	// Ajout des styles de survol aux boutons "+" et "-"
	button.addEventListener('mouseover', () => {
		if (text === '+') {
			button.classList.add('btnSuccessHover');
		} else if (text === '-') {
			button.classList.add('btnDangerHover');
		}
	});

	// Supprimer les styles de survol lorsque le curseur quitte le bouton
	button.addEventListener('mouseout', () => {
		button.classList.remove('btnSuccessHover', 'btnDangerHover');
	});

	return button;
}

// Fonction pour afficher un message de remerciement
function afficherRemerciement() {
	const messageElement = document.createElement('p');
	messageElement.textContent = 'MonPortfolio vous remercie! A bientôt.';
	messageElement.id = 'msgRemerciement';
	const conteneurRemerciement = document.getElementById('conteneurRemerciement');
	conteneurRemerciement.appendChild(messageElement);
	console.log('Affichage du message de remerciement');
	clignotementRemerciement();
}

// Fonction pour afficher la facture
function afficherFacture() {
	const factureElement = document.createElement('div');
	factureElement.innerHTML = `<h3>Facture</h3>
    <p>Date: ${new Date().toLocaleDateString()}<br>
    <p>Total: ${totalPrixElement.textContent}</p>`;

	const conteneurFacture = document.getElementById('conteneurFacture');
	conteneurFacture.appendChild(factureElement);
	console.log('Affichage de la facture');
}

// Fonction pour mettre à jour l'affichage du panier
function updatePanier() {
	const panier = JSON.parse(localStorage.getItem('cart')) || [];
	panierListeElement.innerHTML = '';

	let total = 0;
	let nombreTotalArticles = 0;

	panier.forEach(article => {
		if (isValidArticle(article)) {
			const listItem = createListItem(article);
			panierListeElement.appendChild(listItem);

			total += article.prix * article.quantite;
			nombreTotalArticles += article.quantite;
		} else {
			console.error('Article mal formaté dans le panier:', article);
		}
	});

	totalPrixElement.textContent = `Total : ${total.toFixed(2)} $`;
	updateNombreArticlesStyle(nombreTotalArticles);
	updateButtonAppearance(nombreTotalArticles);
}

// Fonction pour vérifier si l'article est valide
function isValidArticle(article) {
	return article.nom && article.quantite !== undefined && article.prix !== undefined;
}

// Fonction pour créer un élément de liste pour un article
function createListItem(article) {
	const listItem = document.createElement('li');
	const articleInfo = document.createElement('div');
	articleInfo.textContent = `${article.nom} x ${article.quantite}`;
	articleInfo.appendChild(createPriceElement(article)); // Ajoute le prix total

	const deleteButton = createButton('Tout supprimer', () => removeAllOfType(article));
	const decrementButton = createButton('-', () => decrementQuantity(article), 'btnDanger mx-2 mr-auto');
	const incrementButton = createButton('+', () => incrementQuantity(article), 'btnSuccess mx-2');

	listItem.append(articleInfo, decrementButton, incrementButton, deleteButton);
	return listItem;
}

// Fonction pour créer un élément de prix pour chaque article
function createPriceElement(article) {
	const priceElement = document.createElement('div');
	const totalPrice = article.prix * article.quantite;

	if (totalPrice <= 999) {
		priceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
	} else {
		priceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
		priceElement.style.whiteSpace = 'nowrap'; // Éviter le saut de ligne pour les prix plus élevés
	}

	priceElement.style.width = '8rem'; 
	priceElement.style.textAlign = 'right'; 
	return priceElement;
}

// Fonction pour créer un bouton avec du texte et un gestionnaire d'événements
function createButton(text, onClick, classNames = 'btn mx-2') {
	const button = document.createElement('button');
	button.textContent = text;
	button.classList.add(...classNames.split(' '));
	button.addEventListener('click', onClick);
	return button;
}

// Fonction pour mettre à jour le style du nombre d'articles en fonction de la quantité
function updateNombreArticlesStyle(nombreTotalArticles) {
	if (nombreTotalArticles > 0) {
		const position = nombreTotalArticles > 9 ? '57%' : '52%';
		nombreArticlesElement.style.left = position;
		nombreArticlesElement.style.color = 'rgb(49, 49, 199)';
		nombreArticlesElement.style.fontWeight = '600';
	} else {
		nombreArticlesElement.style.color = 'black';
		nombreArticlesElement.style.fontWeight = 'normal';
	}

	nombreArticlesElement.textContent = nombreTotalArticles;
}

// Fonction pour décrémenter les articles par type
function decrementQuantity(article) {
	const panier = JSON.parse(localStorage.getItem('cart')) || [];
	const index = panier.findIndex(item => item.nom === article.nom);

	if (index !== -1 && panier[index].quantite > 1) {
		panier[index].quantite--;
		localStorage.setItem('cart', JSON.stringify(panier));
		updatePanier();
	}
}

// Fonction pour incrémenter les articles par type
function incrementQuantity(article) {
	const panier = JSON.parse(localStorage.getItem('cart')) || [];
	const index = panier.findIndex(item => item.nom === article.nom);

	if (index !== -1) {
		panier[index].quantite++;
		localStorage.setItem('cart', JSON.stringify(panier));
		updatePanier();
	}
}

// Fonction pour mettre à jour le texte et le style du bouton en fonction du nombre d'articles
function updateButtonAppearance(nombreTotalArticles) {
	const viderPanierButton = document.getElementById('viderPanier');

	if (nombreTotalArticles > 0) {
		// Si le panier n'est pas vide
		viderPanierButton.textContent = 'Vider le panier';
		viderPanierButton.classList.remove('btnBlack'); // Retire le style noir
		viderPanierButton.removeAttribute('disabled'); // Active le bouton
	} else {
		// Si le panier est vide
		viderPanierButton.textContent = 'Panier vide';
		viderPanierButton.classList.add('btnBlack'); // Ajoute le style noir
		viderPanierButton.setAttribute('disabled', 'true'); // Désactive le bouton
	}
}

// Fonction pour valider l'achat
function validerAchat() {
	// Récupère le panier du localStorage
	const panier = JSON.parse(localStorage.getItem('cart')) || [];

	// Calcule le total
	let total = 0;
	panier.forEach(article => {
		if (isValidArticle(article)) {
			total += article.prix * article.quantite;
		}
	});

	// Supprime le panier du localStorage
	localStorage.removeItem('cart');

	// Met à jour l'affichage du panier (pour supprimer les éléments de la page)
	updatePanier();

	// Masque les éléments suivants
	const articlesElement = document.getElementById('titreListe');
	const titreTotalElement = document.getElementById('titreTotal');
	const validerAchatButton = document.getElementById('validerAchatButton');
	const iconePanier = document.getElementById('iconePanier');
	const viderPanierBtn = document.getElementById('viderPanier');
	const titrePagePanier = document.querySelector('#titrePagePanier');

	articlesElement.style.display = 'none';
	titreTotalElement.style.display = 'none'; // Masque l'élément "Total"
	validerAchatButton.style.display = 'none';
	nombreArticlesElement.style.display = 'none';
	titrePagePanier.style.display = 'none';
	iconePanier.style.display = 'none';

	// Masque le bouton "Vider le panier"
	viderPanierBtn.style.display = 'none';

	// Affiche le bouton "Panier vide"
	const panierVideButton = document.getElementById('panierVide');
	panierVideButton.style.display = 'block';
	panierVideButton.style.border = '2px black solid';
	panierVideButton.style.color = 'black';
	panierVideButton.style.borderRadius = '0px';

	// Vide le texte de l'élément totalPrixElement
	totalPrixElement.textContent = '';

	// Affiche la facture avec le total calculé
	afficherFacture(total);

	// Appel à la fonction afficherRemerciement après un délai de 3 secondes
setTimeout(() => {
	afficherRemerciement();
  }, 6000);
}

// Affiche la facture avec le total passé en paramètre
function afficherFacture(total) {
	var numeroCommande = Math.floor(Math.random() * 9000000) + 1000000;

	const factureElement = document.createElement('div');
	factureElement.innerHTML = `<h3>Facture</h3>
    <p>Numéro de commande: ${numeroCommande}<br>
    <p>Date: ${new Date().toLocaleDateString()}<br>
    Total: ${total.toFixed(2)} $</p>`;

	const conteneurFacture = document.getElementById('conteneurFacture');
	conteneurFacture.appendChild(factureElement);
	console.log('Affichage de la facture');
}

// Vide le panier et affiche la facture
// Modifiez la fonction viderPanier pour gérer l'état du bouton
function viderPanier() {
	// Supprime le panier du localStorage
	localStorage.removeItem('cart');
	updatePanier();

	// Met à jour le bouton après avoir vidé le panier
	updateButtonAppearance(0); // Le panier est maintenant vide
}

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

// Appel à updatePanier lors du chargement de la page
window.onload = function() {
	updatePanier();
	// Initialisation de l'apparence du bouton
	updateButtonAppearance(0); // Le panier est vide par défaut
};

// Supprime un article du panier
function removeFromPanier(article) {
	const panier = JSON.parse(localStorage.getItem('cart')) || [];
	const index = panier.findIndex(item => item.nom === article.nom);

	if (index !== -1) {
		panier[index].quantite--;

		if (panier[index].quantite <= 0) {
			panier.splice(index, 1);
		}

		localStorage.setItem('cart', JSON.stringify(panier));
		updatePanier();
	}
}

// Supprime tous les articles du même type
function removeAllOfType(article) {
	const panier = JSON.parse(localStorage.getItem('cart')) || [];
	const updatedPanier = panier.filter(item => item.nom !== article.nom);
	localStorage.setItem('cart', JSON.stringify(updatedPanier));
	updatePanier();
}

// Appel à updatePanier lors du chargement de la page
window.onload = function() {
	updatePanier();
	clignotementPanierVide();

	// Appeler la fonction clignotementPanierVide toutes les 3 secondes pour un clignotement continu
	setInterval(() => {
		clignotementPanierVide();
	}, 1000);
};