let panier = document.querySelector('.panier');
let panier_reset = document.querySelector('.panier__reset');
let panier_table = document.querySelector('.panier__table');
let panier_total = document.querySelector('.panier__total');
let form_commande = document.querySelector('.form-commande');
let form_commande_btn = document.querySelector('.form-commande__btn');

if (localStorage.getItem('panier') !== null) {
    /* Suppression des éléments null du tableau de produits */
    let commande = JSON.parse(localStorage.getItem('panier'));
    let c = 0;
    while (c !== -1) {
        c = commande.produits.indexOf(null);
        if (c !== -1) {
            commande.produits.splice(c, 1);
        }
    }

    /* Affichage du panier et du formulaire de commande */
    let nb_produits = commande.produits.length;
    if (nb_produits > 0) {
        let prod_nom, prod_perso, prod_prix;
        let liste_produits = [], btn_suppr = [];
        let liste_prix = [], prix_total = 0;
        let nb_suppr = 0;
        for (let i = 0; i < nb_produits; i++) {
            /* Création du panier */
            prod_nom = commande.produits[i].nom;
            prod_perso = commande.produits[i].perso;
            prod_prix = commande.produits[i].prix;
            liste_prix[i] = parseInt(prod_prix, 10);
            prix_total += liste_prix[i];
            liste_produits[i] = document.createElement('tr');
            liste_produits[i].innerHTML = '<td>' + prod_nom + '</td><td>' + prod_perso + '</td><td>' + formatPrix(prod_prix) + '</td><td><button></button></td>';
            panier_table.appendChild(liste_produits[i]);

            /* ERREUR */
            /* Suppression d'un élément du panier */
            btn_suppr[i] = liste_produits[i].getElementsByTagName('button')[0];
            btn_suppr[i].addEventListener('click', () => {
                panier_table.removeChild(liste_produits[i]);
                commande.produits[i] = null;
                localStorage.setItem('panier', JSON.stringify(commande));
                prix_total -= liste_prix[i];
                panier_total.innerHTML = 'Total: ' + formatPrix(prix_total);
                nb_suppr++;
                if (nb_suppr >= nb_produits) {
                    panier.innerHTML = 'Votre panier est vide.';
                    form_commande.style.display = 'none';
                }
            });
        }

        /* Réinitialisation du panier */
        panier_reset.addEventListener('click', () => {
            if (confirm('Vider le panier ?')) {
                localStorage.removeItem('panier');
                panier.innerHTML = 'Votre panier est vide.';
                form_commande.style.display = 'none';
            }
        });

        /* Affichage du prix total */
        panier_total.innerHTML = 'Total: ' + formatPrix(prix_total);
        form_commande.style.display = 'block';

        /* Envoi du formulaire */
        /*form_commande_btn.addEventListener('click', (e) => {
            e.preventDefault();
            let champ_nom = document.getElementById('nom');
            let champ_prenom = document.getElementById('prenom');
            let champ_adresse = document.getElementById('adresse');
            let champ_ville = document.getElementById('ville');
            let champ_email = document.getElementById('email');
            let contact = {
                firstName: champ_prenom.value,
                lastName: champ_nom.value,
                address: champ_adresse.value,
                city: champ_ville.value,
                email: champ_email.value
            }
            let objet_post = {contact, products};
            fetch('http://localhost:3000/api/teddies/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact, products)
            }).then((data) => {
                console.log(data);
            });
        });*/
    } else {
        panier.innerHTML = 'Votre panier est vide.';
    }
} else {
    panier.innerHTML = 'Votre panier est vide.';
}
panier.style.display = 'block';
 