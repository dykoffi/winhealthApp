function separate(indice, chaine, somme) {
    if (chaine.length <= indice) {
        return (chaine + somme)
    } else {
        somme = " " + chaine.substring(chaine.length - indice, chaine.length) + somme
        chaine = chaine.slice(0, chaine.length - indice)
        return separate(indice, chaine, somme)
    }
}