/*Créez un dossier customer dans lequel vous créez deux fichiers utils.js et index.js, 
le fichier utils est un module permettant d'écrire le code métier.
Dans le fichier index.js importez le code, vos fonctions par exemple,
 permettant de mettre les prix TTC de l'objet priceHT suivant, vous ajouterez le prix TTC dans le tableau priceHT.*/


const priceHT = [
    { name : "Apple", priceHT : 1.0, priceTTC : null },
    { name : "Orange", priceHT : 1.2, priceTTC : null },
    { name : "Rasberry", priceHT : 2.5, priceTTC : null },
];

const addTva = (priceHT) => {
    const TVA = 0.2;
    const priceTTC = priceHT * (1+TVA)
    return priceTTC
}

const updatedPriceHT = priceHT.map((item) => ({
    ...item,
    priceTTC: addTva(item.priceHT)
}))

module.exports = {priceHT, updatedPriceHT}
