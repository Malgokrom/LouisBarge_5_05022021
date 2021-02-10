/* Affichage du panier et du formulaire de commande */
let panier = document.querySelector('.panier');
let panier_table = document.querySelector('.panier__table');
let panier_total = document.querySelector('.panier__total');
let form_commande = document.querySelector('.form-commande');
if (localStorage.length > 0) {
    panier_table.innerHTML += '<tr><td>Produit</td><td>Prix</td><td></td></tr>';
    let nb_produits = localStorage.length;
    let liste_produits = [], btn_suppr = [], prod_id = [];
    let prod_infos, prod_nom, prod_prix;
    let liste_prix = [], prix_total = 0;
    for (let i = 0; i < nb_produits; i++) {
        /* Création du panier */
        prod_id[i] = localStorage.key(i);
        prod_infos = localStorage.getItem(prod_id[i]).split(';');
        prod_nom = prod_infos[0];
        prod_prix = prod_infos[1];
        liste_prix[i] = parseInt(prod_prix, 10);
        prix_total += liste_prix[i];
        liste_produits[i] = document.createElement('tr');
        liste_produits[i].innerHTML = '<td>' + prod_nom + '</td><td>' + formatPrix(prod_prix) + '</td><td><button></button></td>';
        panier_table.appendChild(liste_produits[i]);

        /* Suppression d'un élément du panier */
        btn_suppr[i] = liste_produits[i].getElementsByTagName('button')[0];
        btn_suppr[i].addEventListener('click', () => {
            panier_table.removeChild(liste_produits[i]);
            localStorage.removeItem(prod_id[i]);
            prix_total -= liste_prix[i];
            panier_total.innerHTML = 'Total: ' + formatPrix(prix_total);
            if (localStorage.length == 0) {
                panier.innerHTML = 'Votre panier est vide.';
                form_commande.style.display = 'none';
            }
        });
    }

    /* Affichage du prix total */
    panier_total.innerHTML = 'Total: ' + formatPrix(prix_total);
    form_commande.style.display = 'block';
} else {
    panier.innerHTML = 'Votre panier est vide.';
}
panier.style.display = 'block';

/* Réinitialisation du panier */
let btn_reset = document.querySelector('.panier__reset');
btn_reset.addEventListener('click', () => {
    if (confirm('Vider le panier ?')) {
        localStorage.clear();
        panier.innerHTML = 'Votre panier est vide.';
        form_commande.style.display = 'none';
    }
});
