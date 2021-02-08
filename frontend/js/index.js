/* Test de l'état de la requête */
fetch('http://localhost:3000/api/teddies').then((data) => {
    if (data.status === 200) {
        return data.json();
    }
    throw 'Erreur lors du chargement des données';
/* Message d'erreur */
}).catch((erreur) => {
    alert(erreur);
/* Traitement des données */
}).then((json) => {
    let id_prod, img_prod, descrip_prod, nom_prod, prix_prod;
    let prix_euro, prix_cent;
    let produits = document.getElementById('liste-produits');
    let nb_prod = json.length;
    let tab_prod = [];
    for (let i = 0; i < nb_prod; i++) {
        id_prod = json[i]['_id'];
        img_prod = json[i]['imageUrl'];
        descrip_prod = json[i]['description'];
        nom_prod = json[i]['name'];
        prix_prod = json[i]['price'].toString();
        prix_euro = prix_prod.slice(0, -2);
        prix_cent = '<span class="centimes">' + prix_prod.slice(-2) + '</span> €';
        tab_prod[i] = document.createElement('div');
        tab_prod[i].classList.add('produit');
        tab_prod[i].innerHTML = '<a href="produit.html?id=' + id_prod + '" title="' + nom_prod + '"><figure class="produit__image"><img src="' + img_prod + '" alt="' + descrip_prod + '" /></figure><div class="produit__infos"><p>' + nom_prod + '</p><p>' + prix_euro + ',' + prix_cent + '</p></div></a>';
        produits.appendChild(tab_prod[i]);
    }
});
