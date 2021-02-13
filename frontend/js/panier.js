let panier = document.querySelector('.panier');
let panier_reset = document.querySelector('.panier__reset');
let panier_table = document.querySelector('.panier__table');
let panier_total = document.querySelector('.panier__total');
let form_commande = document.querySelector('.form-commande');
let form_commande_btn = document.querySelector('.form-commande__btn');

/* Envoi du formulaire */
form_commande_btn.addEventListener('click', (e) => {
    e.preventDefault();
});

/* Affichage du panier et du formulaire de commande */
if (localStorage.length > 0) {
    let nb_produits = localStorage.length;
    let prod_infos, prod_nom, prod_couleur, prod_prix;
    let liste_produits = [], btn_suppr = [], prod_id = [];
    let liste_prix = [], prix_total = 0;
    let cle_storage = [];
    for (let i = 0; i < nb_produits; i++) {
        /* Création du panier */
        cle_storage[i] = i.toString();
        prod_infos = localStorage.getItem(cle_storage[i]).split(';');
        prod_id[i] = prod_infos[0];
        prod_nom = prod_infos[1];
        prod_couleur = prod_infos[2];
        prod_prix = prod_infos[3];
        liste_prix[i] = parseInt(prod_prix, 10);
        prix_total += liste_prix[i];
        liste_produits[i] = document.createElement('tr');
        liste_produits[i].innerHTML = '<td>' + prod_nom + '</td><td>' + prod_couleur + '</td><td>' + formatPrix(prod_prix) + '</td><td><button></button></td>';
        panier_table.appendChild(liste_produits[i]);

        /* Suppression d'un élément du panier */
        btn_suppr[i] = liste_produits[i].getElementsByTagName('button')[0];
        btn_suppr[i].addEventListener('click', () => {
            panier_table.removeChild(liste_produits[i]);
            localStorage.removeItem(cle_storage[i]);
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
panier_reset.addEventListener('click', () => {
    if (confirm('Vider le panier ?')) {
        localStorage.clear();
        panier.innerHTML = 'Votre panier est vide.';
        form_commande.style.display = 'none';
    }
});
