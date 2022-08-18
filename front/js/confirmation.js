//Définition du numéro de commande
const IDCOMMANDE = () => {
localStorage.clear();


//Récupération de l'ID de commande dans l'URL
let recuperation_id_URL = window.location.search;
const URLFINALE = new URLSearchParams(recuperation_id_URL);
const ID = URLFINALE.get("Id_commande");
console.log(ID);


//implémentation du numéro de commande
let spanCommande = document.getElementById("orderId");
spanCommande.innerHTML = ` <br>${ID}</br> <span class= "attention"> Veuillez conserver précieusement ce numéro </span>  <br> Merci de votre achat </br> `  ;

let chgmntPadding = document.querySelector(".confirmation p");
chgmntPadding.style.lineHeight = "25px";
let tention = document.querySelector(".attention");
tention.style.fontWeight = "bolder";
}

IDCOMMANDE()

