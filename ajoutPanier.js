// Fonction pour gérer le clic sur une image de la mosaïque
function handleClickOnThumbnail(imageUrl) {
    const selectedImage = getImageBySrc(imageUrl);
    showModal(selectedImage);
}

// Fonction pour afficher le modal avec l'image agrandie
function showModal(image) {
    // Code pour afficher le modal Bootstrap avec l'image agrandie
    // ...

    // Afficher le bouton "Ajouter au panier" dans le modal
    displayAddToCartButton(image);
}

// Fonction pour afficher le bouton "Ajouter au panier" dans le modal
function displayAddToCartButton(image) {
    const addToCartButton = createAddToCartButton(image);
    // Ajouter le bouton au contenu du modal
    // ...
}

// Fonction pour créer le bouton "Ajouter au panier"
function createAddToCartButton(image) {
    const button = document.createElement("button");
    button.innerHTML = "Ajouter au panier";
    button.addEventListener("click", () => addToCart(image));
    return button;
}

// Fonction pour ajouter l'image au panier
function addToCart(image) {
    let cart = JSON.parse(localStorage.getItem("panier_localStorage")) || [];

    const existingItem = cart.find((item) => item.src === image.src);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            src: image.src,
            title: image.title,
            quantity: 1,
            // Autres propriétés de l'image à inclure
        });
    }

    localStorage.setItem("panier_localStorage", JSON.stringify(cart));
    alert("L'image a été ajoutée au panier avec succès!");
}

// Fonction pour récupérer une image à partir de son URL
function getImageBySrc(imageSrc) {
    // Récupérer l'image correspondante à partir de la galerie ou du backend
    // ...

    // Retourner l'objet image
    return {
        src: imageSrc,
        title: "Nom de l'image", // Exemple : titre de l'image
        // Autres propriétés de l'image
    };
}

// Fonction pour initialiser la mosaïque d'images Bootstrap
function initializeImageGallery() {
    const thumbnails = document.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            const imageUrl = thumbnail.getAttribute("src");
            handleClickOnThumbnail(imageUrl);
        });
    });
}

// Appeler la fonction d'initialisation lors du chargement de la page
initializeImageGallery();