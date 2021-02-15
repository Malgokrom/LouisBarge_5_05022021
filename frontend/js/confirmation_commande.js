/* Récupération des paramètres "orderid" et "total" de l'URL */ 
let url = new URL(window.location.href);
let orderid = url.searchParams.get('orderid');
let total = formatPrix(url.searchParams.get('total'));

/* Affichage de l'ID de commande et du prix total */
if (total && orderid) {
    document.getElementById('id-commande').innerHTML = orderid;
    document.getElementById('prix-commande').innerHTML = total;
}

localStorage.removeItem('panier');
