// const number = {

// }

// const unite = ["zero", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"]
// const fisrtDizaine = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"]
// const dizaine = ["vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"]

// function ctol(c) {
//     try { n = c.toString() } catch (error) { n = c }
//     switch (n.length) {
//         case 1: return unite[c]
//         case 2: return n[0] === "1" ?
//             fisrtDizaine[parseInt(n[1])] : n[1] === "1" ? dizaine[parseInt(n[0] - 2)] + "-et-" + unite[n[1]] : dizaine[parseInt(n[0] - 2)] + "-" + unite[n[1]]


//         default: return false
//     }
// }

// for (let index = 0; index <= 99; index++) {
//     console.log(index + ': ' + ctol(index));
// }
