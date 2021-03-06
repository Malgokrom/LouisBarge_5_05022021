/* Récupération du paramètre "id" de l'URL */ 
let url = new URL(window.location.href);
let id = url.searchParams.get('id');

/* Test de l'état de la requête */
fetch('http://localhost:3000/api/teddies/' + id).then((data) => {
    if (data.ok) {
        return data.json();
    }
    throw 'Erreur ' + data.status;
}).catch((erreur) => {
    document.querySelector('main').innerHTML = '<p>Impossible d\'afficher la page demandée</p>';
    alert(erreur);
}).then((json) => {
    /* Ajout des options de personnalisation */
    let custom = document.getElementById('custom');
    let tab_couleurs = json['colors'];
    let nb_couleurs = tab_couleurs.length;
    let liste_options = '';
    for (let i = 0; i < nb_couleurs; i++) {
        liste_options += '<option value="' + tab_couleurs[i] + '">' + tab_couleurs[i] + '</option>';
    }
    custom.innerHTML = liste_options;
    let couleur = tab_couleurs[0];
    custom.addEventListener('change', () => {
        couleur = custom.value;
    });

    /* Gestion du bloc de confirmation d'ajout au panier */
    let confirm_ajout = document.getElementById('confirm-ajout');
    let confirm_lien = document.querySelector('.confirm-bloc__btns a:nth-child(2)')
    document.querySelector('.confirm-bloc__titre').innerHTML = json['name'];
    confirm_lien.addEventListener('click', () => {
        confirm_ajout.style.display = 'none';
    });

    /* Ajout du produit au panier */
    let btn_ajout = document.getElementById('btn-ajout');
    btn_ajout.addEventListener('click', () => {
        /* Affichage de la confirmation d'ajout */
        confirm_ajout.style.display = 'flex';

        /* Ajout dans le localStorage */
        if (localStorage.getItem('panier') === null) {
            localStorage.setItem('panier', '{"produits":[]}');
        }
        let panier = JSON.parse(localStorage.getItem('panier'));
        let new_prod = {
            id: json['_id'],
            nom: json['name'],
            perso: couleur,
            prix: json['price'],
            description: json['description']
        };
        panier.produits.push(new_prod);
        localStorage.setItem('panier', JSON.stringify(panier));
    });

    /* Remplissage des éléments HTML */
    document.querySelector('h1').innerHTML = json['name'];
    document.getElementById('nom-produit').innerHTML = json['name'];
    document.getElementById('prix-produit').innerHTML = formatPrix(json['price']);
    document.getElementById('description-produit').innerHTML = json['description'];
    
    /* Chargement des images */
    let image_produit = document.getElementById('image-produit');
    image_produit.innerHTML = '<img src="' + json['imageUrl'] + '" alt="' + json['description'] + '" title="Cliquez pour affichier en mode plein écran" />';
    let image_fullscreen = document.querySelector('.image-fullscreen');
    image_fullscreen.innerHTML += '<img class="image-fullscreen__produit" src="' + json['imageUrl'] + '" alt="' + json['description'] + '" />';
    let image_fullscreen_fermer = document.querySelector('.image-fullscreen__fermer');
    let image_fullscreen_produit = document.querySelector('.image-fullscreen__produit');
    
    /* Gestion de l'affichage en mode plein écran */
    image_produit.addEventListener('click', () => {
        image_fullscreen.style.display = 'flex';
    });
    image_produit.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            image_fullscreen.style.display = 'flex';
        }
    });
    image_fullscreen_fermer.addEventListener('click', () => {
        image_fullscreen.style.display = 'none';
    });
    image_fullscreen_fermer.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            image_fullscreen.style.display = 'none';
        }
    });
    image_fullscreen.addEventListener('click', () => {
        image_fullscreen.style.display = 'none';
    });
    image_fullscreen_produit.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
