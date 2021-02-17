/* Passage du format de prix "xxxx" au format "xx,xx €" */
function formatPrix (prix) {
    prix = prix.toString();
    while (prix.length < 3) {
        prix = '0' + prix;
    }
    if (/\D/.test(prix)) {
        return false;
    } else {
        return prix.slice(0, -2) + ',<span class="centimes">' + prix.slice(-2) + '</span>&nbsp;€';
    }
}
