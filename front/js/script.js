

//Demande de consultation des éléments de l'API
const FETCHCANAP = async() => {
    await fetch("http://localhost:3000/api/products")
    .then((rep) => rep.json())
    .then((promise) => {
        canapData = promise;
        console.table(canapData);
    });
};

//Affichage des données de l'APi dans la page index
const AFFICHAGECANAP = async() => {
    await FETCHCANAP();
//On va dans l'ID items + création de balise dans une boucle map
document.getElementById("items").innerHTML = canapData.map((canap) =>`  
<a href= "../html/product.html?id=${canap._id}=" class= ".items a .items a:hover article">
    <article id= "carte_${canap._id}" class= ".items article">
        <img id= "carte_image" class= ".items article img" src= "${canap.imageUrl}" alt= "${canap.altTxt}" />
        <h3 id= "carte_titre" class= ".items article h3"> ${canap.name} </h3>
        <p id= "carte_description" class= ".items article p"> ${canap.description} </p>
    </article>
</a>`
).join("")
} 


AFFICHAGECANAP();









  