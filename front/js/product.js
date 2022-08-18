//Récupération de l'ID dans l'URL
let recuperation_id_url = window.location.search;
const URLFINALE = new URLSearchParams(recuperation_id_url);
console.log(URLFINALE)
//On utiliser la méthode split pour ne garder que l'ID (ce qu'il y a entre parenthèses) afin que l'API puisse nous restituer le produit
const ID = URLFINALE.get("id").split("=").join("");
console.log(ID)


let canapProduit =[]

//Affichage de l'ensemble de l'objet grâce à son id dans un Array
const FETCHID = async () => {
    await fetch(`http://localhost:3000/api/products/${ID}`)
    .then((rep) => rep.json())
    .then((promise) => {
        canapProduit = promise;
    }) 
}

FETCHID();


//Création de l'objet identifié en index pour le faire apparaître en page produit sans crééer de boucle
const AFFICHAGEPRODUIT = async () => {
    await FETCHID();
//On importe l'image
    document.querySelector(".item__img").innerHTML = `
    <img class= ".item__img img" src= "${canapProduit.imageUrl}" alt= "${canapProduit.altTxt}" />`;
    
//On importe le titre
    document.getElementById("title").innerHTML = `
    <h1 class= ".item__content h1"> ${canapProduit.name} </h1>`;

//On importe le prix
    document.getElementById("price").innerHTML = `
    <span class= ".item__content__titlePrice p"> ${canapProduit.price} </span> `;

//On importe la description
    document.getElementById("description").innerHTML = `
    <p class= ".item__content__description"> ${canapProduit.description} </p>`;

//On importe l'Id du produit dans le bouton panier
    document.getElementById("addToCart").setAttribute("id",`${canapProduit._id}`);



//On indique la couleur du canapé de l'Array avec la méthode for each car nous n'avons pas besoin de créer un nouveau tableau
let option_value = document.getElementById("colors");
canapProduit.colors.forEach((couleur) => {
//Pour respecter la nomenclature d'un élément déroulant, nous créons une balise option à laquelle nous rajoutons .value
    let option = document.createElement("option");
    option.innerHTML = `${couleur}`;  
    option.value = `${couleur}`; 
    option_value.appendChild(option);
})
AJOUT_PANIER(canapProduit);
}
 
AFFICHAGEPRODUIT();



//Ajouter des éléments au panier
const AJOUT_PANIER = () => {
    let bouton = document.getElementById(canapProduit._id);

    bouton.addEventListener("click", () => {
    let produitStorage = JSON.parse(localStorage.getItem("produit"));
    let selectionCouleur = document.getElementById ("colors");
    let option_quantite = document.getElementById("quantity");

//On créer un objet dans l'Array représentant la couleur choisie et la quantité
const CHOIXCANAP = Object.assign({}, canapProduit, {
    couleur : `${selectionCouleur.value}`,
    quantite : Number(`${option_quantite.value}`),
});



//On rajoute cette condition pour que l'utilisateur définisse une quantité
if (CHOIXCANAP.quantite === 0){
    return(alert("Veuillez renseigner une quantité"))
}

//On rajoute cette condition pour que l'utilisateur définisse une couleur
if (CHOIXCANAP.couleur == ""){
    return(alert("Veuillez renseigner une couleur"))
}

//Rajoute un produit si le localStorage n'en contient aucun
if (produitStorage == null){
    return(
    produitStorage = [],
    produitStorage.push(CHOIXCANAP),
//On ajoute les informations du produit dans le localStorage
    localStorage.setItem("produit", JSON.stringify(produitStorage)),
    produitStorage = JSON.parse(localStorage.getItem("produit")),
    bouton.textContent = "Produit ajouté au panier",
    bouton.style.color = "#00ff3b",
    setTimeout(function(){window.location.href="index.html"}, 1000)
    )}


//Rajouter un élément dans localStorage s'il y a déjà un 
else { 
    for (let i in produitStorage)
     {   produitStorage = JSON.parse(localStorage.getItem("produit"))
        if(
            produitStorage[i]._id == CHOIXCANAP._id &&
            produitStorage[i].couleur == CHOIXCANAP.couleur
            ) 
        return(
            produitStorage[i].quantite += Number(CHOIXCANAP.quantite),
            localStorage.setItem("produit", JSON.stringify(produitStorage)),
            bouton.textContent = "Produit ajouté au panier",
            bouton.style.color = "#00ff3b",
            setTimeout(function(){window.location.href="index.html"}, 1000)
           )
    }
       
//Boucle for pour ajouter des nouveaux produits si la couleur est différent OU l'ID    
    for (let i in produitStorage)
     {
        if (( produitStorage[i]._id == CHOIXCANAP._id && 
        produitStorage[i].couleur !== CHOIXCANAP.couleur) ||
        produitStorage[i]._id !== CHOIXCANAP._id) 
        return(
            produitStorage.push(CHOIXCANAP),
            localStorage.setItem("produit", JSON.stringify(produitStorage)),
            bouton.textContent = "Produit ajouté au panier",
            bouton.style.color = "#00ff3b",
            setTimeout(function(){window.location.href="index.html"}, 1000)
            ); 
        }
    
//Nous retourne l'élément du tableau pour pouvoir en rajouter
return (produitStorage = JSON.parse(localStorage.getItem("produit")));
        }; 
    }
)}
