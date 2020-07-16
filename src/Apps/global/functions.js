export function separate(chaine, indice, somme) {
    indice = indice === undefined ? 3 : indice
    somme = somme === undefined ? "" : somme
    if (chaine === undefined) return null
    try { chaine = chaine.toString() } catch (error) { chaine = chaine }
    if (chaine.length <= indice) {
        return (chaine + somme)
    } else {
        somme = " " + chaine.substring(chaine.length - indice, chaine.length) + somme
        chaine = chaine.slice(0, chaine.length - indice)
        return separate(chaine, indice, somme)
    }
}