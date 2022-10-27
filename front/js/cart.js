// Nous récupérons les informations dans le localStorage
let panier = JSON.parse(localStorage.getItem("produit"));


//Affichage des produits selectionnés dans la page panier
const AFFICHAGEPANIER =  async () => {
  let panier = JSON.parse(localStorage.getItem("produit"))
if (panier) {
    await panier;
}

//Nous récupérons les informations de l'API 
  await fetch(`http://localhost:3000/api/products/`)
  .then((rep) => rep.json())
  .then((promise) => {
      canapProduit = promise;
  }) 

//Nous prennons toutes les informations utiles depuis le localStorage sauf le prix qui provient de l'API
canapProduit.forEach((variable) => {
  for(let i in panier) {
    if(panier[i]._id == variable._id)
    {
      
// Insertion de l'élément "article"
let productArticle = document.createElement("article");
document.querySelector("#cart__items").appendChild(productArticle);
productArticle.className = "cart__item";
productArticle.setAttribute('data-id', panier[i].idProduit);

 // Insertion de l'élément "div"
 let productDivImg = document.createElement("div");
 productArticle.appendChild(productDivImg);
 productDivImg.className = "cart__item__img";

// Insertion de l'image
let productImg = document.createElement("img");
productDivImg.appendChild(productImg);
productImg.src = panier[i].imageUrl;
productImg.alt = panier[i].altTxt;

// Insertion de l'élément "div"
let productItemContent = document.createElement("div");
productArticle.appendChild(productItemContent);
productItemContent.className = "cart__item__content";

// Insertion de l'élément "div"
let productItemContentTitlePrice = document.createElement("div");
productItemContent.appendChild(productItemContentTitlePrice);
productItemContentTitlePrice.className = "cart__item__content__titlePrice";

// Insertion du titre h2
let productTitle = document.createElement("h2");
productItemContentTitlePrice.appendChild(productTitle);
productTitle.innerHTML = panier[i].name;

// Insertion de la couleur
let productColor = document.createElement("p");
productTitle.appendChild(productColor);
productColor.innerHTML = panier[i].couleur;
productColor.style.fontSize = "20px";

// Insertion du prix
let productPrice = document.createElement("p");
productItemContentTitlePrice.appendChild(productPrice);
productPrice.innerHTML = variable.price + " €";

// Insertion de l'élément "div"
let productItemContentSettings = document.createElement("div");
productItemContent.appendChild(productItemContentSettings);
productItemContentSettings.className = "cart__item__content__settings";

// Insertion de l'élément "div"
let productItemContentSettingsQuantity = document.createElement("div");
productItemContentSettings.appendChild(productItemContentSettingsQuantity);
productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

// Insertion de "Qté : "
let productQte = document.createElement("p");
productItemContentSettingsQuantity.appendChild(productQte);
productQte.innerHTML = "Qté : ";

// Insertion de la quantité
let productQuantity = document.createElement("input");
productItemContentSettingsQuantity.appendChild(productQuantity);
productQuantity.value = panier[i].quantite;
productQuantity.className = "itemQuantity";
productQuantity.setAttribute("type", "number");
productQuantity.setAttribute("min", "1");
productQuantity.setAttribute("max", "100");
productQuantity.setAttribute("name", "itemQuantity");
productQuantity.setAttribute("data-value", panier[i].quantite);
productQuantity.setAttribute("data-id", panier[i]._id);
productQuantity.setAttribute("data-color", panier[i].couleur);
productQuantity.setAttribute("data-price", variable.price)

// Insertion de l'élément "div"
let productItemContentSettingsDelete = document.createElement("div");
productItemContentSettings.appendChild(productItemContentSettingsDelete);
productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

// Insertion de "p" supprimer
let productSupprimer = document.createElement("p");
productItemContentSettingsDelete.appendChild(productSupprimer);
productSupprimer.className = "deleteItem";
productSupprimer.innerHTML = "Supprimer";
productSupprimer.setAttribute("data-id", panier[i]._id);
productSupprimer.setAttribute("data-color", panier[i].couleur);
};     
    };
    
  });
  SUPPRIMERPANIER();
  MODIFQUANTITE();
  TOTALPRODUIT();
};
AFFICHAGEPANIER();


// Modification des quantités de manière dynamique
function MODIFQUANTITE() {
  const SELECTITEM = document.querySelectorAll(".itemQuantity");
  
  SELECTITEM.forEach((kanap) => {
    kanap.addEventListener("change", (e) => {
    e.preventDefault();
      
      for (i in panier){
        if (panier[i]._id == kanap.dataset.id && panier[i].couleur == kanap.dataset.color) {
          return panier[i].quantite = kanap.value,
                 localStorage.setItem("produit", JSON.stringify(panier)),
                 location.reload();
        }
      };
    })
  })
};

//Fonction pour supprimer un produit dans le panier
const SUPPRIMERPANIER = async () => {
  await AFFICHAGEPANIER;
  let corbeille = document.querySelectorAll(".deleteItem");

  corbeille.forEach((produitCorbeille) => {
    produitCorbeille.addEventListener("click", () => {
let panier = JSON.parse(localStorage.getItem("produit"));  
let totalPanierSupprimer = panier.length;
//Cette première condition supprime tout simplement le localStorage s'il n'y a qu'1 élément
if (
  totalPanierSupprimer == 1
)
return (
  localStorage.removeItem("produit"),
  location.reload()
);

else {
  for(let i in panier) {
  if(
    totalPanierSupprimer > 1
  )//On garde les éléments qui sont différents par la méthode filtre
  return (
  panierRemove = panier.filter(
     (el) => el._id !== produitCorbeille.dataset.id ||
             el.couleur !== produitCorbeille.dataset.color),
  localStorage.setItem("produit", JSON.stringify(panierRemove)),
  window.location.href="cart.html"
  )}
      }
    }
  )}
)}



//Fonction pour afficher le prix total du panier
const TOTALPRODUIT = async (AFFICHAGEPANIER, SUPPRIMERPANIER, MODIFQUANTITE) => {
 await AFFICHAGEPANIER
 await SUPPRIMERPANIER
 await MODIFQUANTITE

let totalArticle = 0;
let prixTotal = 0;

//Défini le nombre total d'articles en le prennant du localStorage
 for (let article of panier) 
 {totalArticle += JSON.parse(article.quantite);}

//On utilise une boucle pour restituer chaque prix de chaque produit en fonction de sa quantité
let recherchePrix = document.querySelectorAll(".itemQuantity")
recherchePrix.forEach((cart) => {
  prixArticle = cart.dataset.price;
  quantiteParArticle = Number(cart.dataset.value);
  prixParArticle = prixArticle *= quantiteParArticle;
  prixTotal += prixParArticle;
})

  
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = prixTotal;
}
 




//Formulaire de contact
let valeurPrenom, valeurNom, valeurAdresse, valeurVille, valeurEmail;
const INFOCLIENTS = [];
const PRENOM = document.getElementById("firstName");

PRENOM.addEventListener("input", () => {
  valeurPrenom;
  if (PRENOM.value.length == 0)
  return (
    document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom", 
    valeurPrenom = null,
    localStorage.removeItem("firstName")
    )   
    
    else if (PRENOM.value.length < 2 || PRENOM.value.length > 20 )
        return (
          document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom",
          valeurPrenom = null,
          localStorage.removeItem("firstName")
        ) 
//Comme reggex nous tolérons des minuscules/Majuscules, des espaces entre les mots et une chaine de caractère entre 2 et 20 mots
      if (PRENOM.value.match(/^[a-z A-Z]{2,20}$/))
      return (
        document.getElementById("firstNameErrorMsg").innerHTML = "",
        valeurPrenom = PRENOM.value,
        localStorage.setItem("firstName", document.getElementById("firstName").value)
      )
//On dit que si c'est différent de ces conditions
      if (!PRENOM.value.match(/^[a-z A-Z]{2,20}$/) && PRENOM.value.length > 2 || PRENOM.value.length < 20)
      return(
        document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner votre prénom sans chiffres ni caractères spéciaux ni accents",
        valeurPrenom = null,
        localStorage.removeItem("firstName")
        )    
});
 


const NOM = document.getElementById("lastName");
NOM.addEventListener("input", () => {
  valeurNom;
  if (NOM.value.length == 0)
  return (
    document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille", 
    valeurNom = null,
    localStorage.removeItem("lastName")
    )   
    
    else if (NOM.value.length < 2 || NOM.value.length > 25 )
        return (
          document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille",
          valeurNom = null,
          localStorage.removeItem("lastName")
        ) 

      if (NOM.value.match(/^[a-z A-Z]{2,25}$/))
      return (
        document.getElementById("lastNameErrorMsg").innerHTML = "",
        valeurNom = NOM.value,
        localStorage.setItem("lastName", document.getElementById("lastName").value)
      )

      if (!NOM.value.match(/^[a-z A-Z]{2,25}$/) && NOM.value.length > 2 || NOM.value.length < 25)
      return(
        document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner votre nom de famille sans chiffres ni caractères spéciaux ni accents",
        valeurNom = null,
        localStorage.removeItem("lastName")
        )    
});


const ADRESSE = document.getElementById("address");

ADRESSE.addEventListener("input", () => {
  valeurAdresse;
  if (ADRESSE.value.length == 0)
  return (
    document.getElementById("addressErrorMsg").innerHTML = "Veuillez renseigner votre adresse", 
    valeurAdresse = null,
    localStorage.removeItem("address")
    )   
    
    else if (ADRESSE.value.length < 5 || ADRESSE.value.length > 45 )
        return (
          document.getElementById("addressErrorMsg").innerHTML = "Votre adresse doit contenir entre 5 et 45 caractères",
          valeurAdresse = null,
          localStorage.removeItem("address")

        ) 
      if (ADRESSE.value.match(/^[0-9]{1,3} [a-z A-Z]{3,45}$/))
      return (
        document.getElementById("addressErrorMsg").innerHTML = "",
        valeurAdresse = ADRESSE.value,
        localStorage.setItem("address", document.getElementById("address").value)
      )
      if (!ADRESSE.value.match(/^[0-9]{1,3} [a-z A-Z]{3,45}$/) && ADRESSE.value.length > 5 || ADRESSE.value.length < 45)
      return(
        document.getElementById("addressErrorMsg").innerHTML = "Votre adresse doit commencer par le numéro de rue, sans caractères spéciaux ni d'accents",
        valeurAdresse = null,
        localStorage.removeItem("address")
        )      
});


const VILLE = document.getElementById("city");

VILLE.addEventListener("input", () => {
  valeurVille;
  if (VILLE.value.length == 0)
  return (
    document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville", 
    valeurVille = null,
    localStorage.removeItem("city")
    )   
    
    else if (VILLE.value.length < 2 || VILLE.value.length > 25 )
        return (
          document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville",
          valeurVille = null,
          localStorage.removeItem("city")
        ) 
      if (VILLE.value.match(/^[a-z A-Z]{2,25}$/))
      return (
        document.getElementById("cityErrorMsg").innerHTML = "",
        valeurVille = VILLE.value,
        localStorage.setItem("city", document.getElementById("city").value)
      )
      if (!VILLE.value.match(/^[a-z A-Z]{2,25}$/) && VILLE.value.length > 2 || VILLE.value.length < 25)
      return(
        document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner votre ville sans chiffres ni caractères spéciaux ni accents",
        valeurVille = null,
        localStorage.removeItem("city")
        )      
});



const EMAIL = document.getElementById("email");

EMAIL.addEventListener("input", () => {
  valeurEmail;

  if (EMAIL.value.lenght == 0)
  return (
    document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner votre Email",
    valeurEmail = null
    //localStorage.removeItem("email")
    )
                          //n'importe quel caractère avec un point + @ suivi de n'importe quel caractère avec un point + n'importe quel mot entre 2 et 3 caractères
    else if (EMAIL.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/))
    return (
      document.getElementById("emailErrorMsg").innerHTML = "",
      valeurEmail = EMAIL.value,
      localStorage.setItem("email", document.getElementById("email").value)
    )
    else return (
      document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner un Email valide",
      valeurEmail = null,
      localStorage.removeItem("email") 
    )
});


//Fonction pour valider le formulaire
const FORMULAIRE = () => {
let bouttonCommander = document.getElementById("order");
bouttonCommander.addEventListener("click", (even) => {

//On indique une condition pour que tous les champs soient remplis dans LocalStorage avant de pouvoir envoyer le formulaire
if 
  ("firstName" in localStorage &&
  "lastName" in localStorage &&
  "address" in localStorage &&
  "city" in localStorage &&
  "email" in localStorage &&
  "produit" in localStorage) 
  return(
      OBJETFORMULAIRE = {
      firstName : localStorage.getItem("firstName"),
      lastName : localStorage.getItem("lastName"),
      address : localStorage.getItem("address"),
      city : localStorage.getItem("city"),
      email : localStorage.getItem("email"),
    },
    localStorage.setItem("INFOCLIENT",JSON.stringify(OBJETFORMULAIRE))
  )
    else (
      alert("Veuillez respecter les consignes du formulaire"),
      even.preventDefault()
     )
  })
};
  FORMULAIRE();
  

// Récupération des informations nécessaires avant envoi vers le serveur
let panierID = [];

const PAQUET = () => { 
  contactRef = JSON.parse(localStorage.getItem("INFOCLIENT"));
  panier = JSON.parse(localStorage.getItem("produit"));

  for (let variable of panier) {
    panierID.push(variable._id)
   
  // définition de l'objet commande
  commandeFinale = {
    contact: {
      firstName: contactRef.firstName,
      lastName: contactRef.lastName,
      address: contactRef.address,
      city: contactRef.city,
      email: contactRef.email,
    },
    products: panierID
  }; 
}};



//Envoie des donées vers le serveur
const ENVOISERVEUR = async () => {
  PAQUET();

  await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commandeFinale),
})

.then((rep) => rep.json())
.then((promise) => {
  window.location.href = `confirmation.html?Id_commande=${promise.orderId}`;
})
};

ENVOISERVEUR();
