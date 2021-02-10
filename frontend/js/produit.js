/* Récupération du paramètre "id" de l'URL */ 
let url = new URL(window.location.href);
let id = url.searchParams.get('id');

/* Test de l'état de la requête */
fetch('http://localhost:3000/api/teddies/' + id).then((data) => {
    if (data.status === 200) {
        return data.json();
    }
    throw 'Erreur lors du chargement des données';
/* Message d'erreur */
}).catch((erreur) => {
    alert(erreur);
/* Traitement des données */
}).then((json) => {
    /* Ajout du produit au panier */
    let btn_ajout = document.getElementById('btn-ajout');
    btn_ajout.addEventListener('click', () => {
        if (localStorage.getItem(json['_id']) === null) {
            localStorage.setItem(json['_id'], json['name'] + ';' + json['price'])
        }
    });

    /* Remplissage des éléments HTML */
    document.querySelector('h1').innerHTML = json['name'];
    document.getElementById('nom-produit').innerHTML = json['name'];
    document.getElementById('prix-produit').innerHTML = formatPrix(json['price']);
    document.getElementById('description-produit').innerHTML = json['description'];
    
    /* Chargement des images */
    let image_produit = document.getElementById('image-produit');
    image_produit.innerHTML = '<img src="' + json['imageUrl'] + '" alt="' + json['description'] + '" />';
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

    /* Ajout des options de personnalisation */
    let custom = document.getElementById('custom');
    let tab_couleurs = json['colors'];
    let nb_couleurs = tab_couleurs.length;
    let liste_options = '';
    for (let i = 0; i < nb_couleurs; i++) {
        liste_options += '<option value="' + i + '">' + tab_couleurs[i] + '</option>';
    }
    custom.innerHTML = liste_options;
});
