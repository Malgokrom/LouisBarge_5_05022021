/* Affichage du panier */
let panier = document.querySelector('.panier');
let panier_table = document.querySelector('.panier__table');
if (localStorage.length > 0) {
    let nb_produits = localStorage.length;
    let liste_produits = [], btn_suppr = [];
    let prod_id = [];
    let prod_infos, prod_nom, prod_prix;
    for (let i = 0; i < nb_produits; i++) {
        prod_id[i] = localStorage.key(i);
        prod_infos = localStorage.getItem(prod_id[i]).split(';');
        prod_nom = prod_infos[0];
        prod_prix = prod_infos[1];
        liste_produits[i] = document.createElement('tr');
        liste_produits[i].innerHTML = '<td>' + prod_nom + '</td><td>' + formatPrix(prod_prix) + '</td><td><button>Supprimer</button></td>';
        panier_table.appendChild(liste_produits[i]);

        /* Suppression d'un élément du panier */
        btn_suppr[i] = liste_produits[i].getElementsByTagName('button')[0];
        btn_suppr[i].addEventListener('click', () => {
            panier_table.removeChild(liste_produits[i]);
            localStorage.removeItem(prod_id[i]);
            if (localStorage.length == 0) {
                panier.innerHTML = "Votre panier est vide.";
            }
        });
    }
} else {
    panier.innerHTML = "Votre panier est vide.";
}
panier.style.display = 'block';

/* Réinitialisation du panier */
let btn_reset = document.querySelector('.panier__reset');
btn_reset.addEventListener('click', () => {
    if (confirm('Vider le panier ?')) {
        localStorage.clear();
        panier.innerHTML = "Votre panier est vide.";
    }
});
