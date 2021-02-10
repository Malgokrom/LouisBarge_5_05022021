/* Passage du format de prix "xxxx" au format "xx,xx €" */
function formatPrix (prix) {
    prix = prix.toString();
    if (/\D/.test(prix)) {
        alert('Donnée incorrect');
        return false;
    } else {
        return prix.slice(0, -2) + ',<span class="centimes">' + prix.slice(-2) + '</span>&nbsp;€';
    }
}

/* Ajout d'un produit au panier */
function ajoutPanier (id, nom, prix) {
    if (localStorage.getItem(id) === null) {
        localStorage.setItem(id, nom + ';' + prix)
    }
}
