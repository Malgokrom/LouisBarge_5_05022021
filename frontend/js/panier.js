/* Eléments HTML */
let panier = document.querySelector('.panier');
let panier_reset = document.querySelector('.panier__reset');
let panier_table_tbody = document.querySelector('.panier__table tbody');
let panier_total = document.querySelector('.panier__total');
let form_commande = document.querySelector('.form-commande');
let form_commande_btn = document.querySelector('.form-commande__btn');

if (localStorage.getItem('panier') !== null) {
    /* Suppression des éléments null du tableau de produits */
    let commande = JSON.parse(localStorage.getItem('panier'));
    let nb_produits = commande.produits.length;
    for (let i = 0; i < nb_produits; i++) {
        if (commande.produits[i] === null) {
            commande.produits.splice(i, 1);
            i--;
        }
    }

    /* Affichage du panier et du formulaire de commande */
    nb_produits = commande.produits.length;
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
            panier_table_tbody.appendChild(liste_produits[i]);

            /* Suppression d'un élément du panier */
            btn_suppr[i] = liste_produits[i].getElementsByTagName('button')[0];
            btn_suppr[i].addEventListener('click', () => {
                panier_table_tbody.removeChild(liste_produits[i]);
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

        /* Test de validité des données */
        let couleur_bg_erreur = '#FF9090';
        let couleur_bg_valid = '#FFFFFF';
        function testValid (champ, regex) {
            if (regex.test(champ.value)) {
                champ.style.backgroundColor = couleur_bg_valid;
                return true;
            } else if (champ.value === '') {
                champ.style.backgroundColor = couleur_bg_valid;
                return false;
            } else {
                champ.style.backgroundColor = couleur_bg_erreur;
                return false;
            }
        }
        let user_prenom = document.getElementById('prenom'), valid_prenom = false;
        let user_nom = document.getElementById('nom'), valid_nom = false;
        let user_adresse = document.getElementById('adresse'), valid_adresse = false;
        let user_ville = document.getElementById('ville'), valid_ville = false;
        let user_email = document.getElementById('email'), valid_email = false;
        let regex_nom = /^[-a-zA-ZœçàâäéèêëîïôöùûüŷÿŒÇÀÂÄÉÈÊËÎÏÔÖÙÛÜŶŸ\s]{1,64}$/;
        let regex_adresse = /^[-a-zA-ZœçàâäéèêëîïôöùûüŷÿŒÇÀÂÄÉÈÊËÎÏÔÖÙÛÜŶŸ\d\s]{1,128}$/;
        let regex_email = /^[-._a-zA-Z0-9]+@[-._a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
        user_prenom.addEventListener('change', () => {
            valid_prenom = testValid(user_prenom, regex_nom);
        });
        user_nom.addEventListener('change', () => {
            valid_nom = testValid(user_nom, regex_nom);
        });
        user_adresse.addEventListener('change', () => {
            valid_adresse = testValid(user_adresse, regex_adresse);
        });
        user_ville.addEventListener('change', () => {
            valid_ville = testValid(user_ville, regex_nom);
        });
        user_email.addEventListener('change', () => {
            valid_email = testValid(user_email, regex_email);
        });

        /* Envoi du formulaire */
        form_commande_btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (valid_prenom && valid_nom && valid_adresse && valid_ville && valid_email) {
                /* Objet de contact */
                let user = {
                    firstName: user_prenom.value,
                    lastName: user_nom.value,
                    address: user_adresse.value,
                    city: user_ville.value,
                    email: user_email.value
                }

                /* Tableau d'ID de produits */
                let tab_id = [];
                c = commande.produits.length;
                for (let i = 0; i < c; i++) {
                    if (commande.produits[i] !== null) {
                        tab_id.push(commande.produits[i].id);
                    }
                }

                /* Envoi de la requête de commande */
                fetch('http://localhost:3000/api/teddies/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contact: user,
                        products: tab_id
                    })
                }).then((data) => {
                    if (data.ok) {
                        return data.json();
                    }
                    throw 'Erreur ' + data.status;
                }).catch((erreur) => {
                    alert(erreur);
                }).then((json) => {
                    window.location = 'confirmation_commande.html?orderid=' + json.orderId + '&total=' + prix_total;
                });
            } else {
                /* Affichage de la liste des champs invalides */
                let form_commande_erreurs = document.querySelector('.form-commande__erreurs');
                let chaine_erreurs = '';
                if (!valid_prenom) {
                    chaine_erreurs += 'Le champ "Prénom" est invalide.<br />';
                }
                if (!valid_nom) {
                    chaine_erreurs += 'Le champ "Nom" est invalide.<br />';
                }
                if (!valid_adresse) {
                    chaine_erreurs += 'Le champ "Adresse" est invalide.<br />';
                }
                if (!valid_ville) {
                    chaine_erreurs += 'Le champ "Ville" est invalide.<br />';
                }
                if (!valid_email) {
                    chaine_erreurs += 'Le champ "Email" est invalide.<br />';
                }
                form_commande_erreurs.innerHTML = chaine_erreurs;
            }
        });
    } else {
        panier.innerHTML = 'Votre panier est vide.';
    }
} else {
    panier.innerHTML = 'Votre panier est vide.';
}
panier.style.display = 'block';
 