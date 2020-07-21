//Architecture et liste des fonctionnailités disponibles dans le Navbar
const props = {
    "nomapp": "GAP",
    "functions": [
        {
            "name": "Accueil",
            "subfunctions": []
        },
        {
            "name": "Admission",
            "subfunctions": []
        },
        {
            "name": "Caisse",
            "subfunctions": []
        },
        {
            "name": "Statistiques",
            "subfunctions": []
        },
        {
            "name": "Assurance",
            "subfunctions": [
                { target: "listeAssurances" },
                { target: "facturesRecues" },
                { target: "bordereaux" },
            ]
        }
    ]
}

const functionP = "Assurance"
const subfunctions = props.functions.filter(f => f.name === functionP).flatMap(f => f.subfunctions).map(f => f.target)
console.log(subfunctions)
const Onglets = [
    { target: "listeAssurances", title: "Listes des assurances", icon: 'action-assignment' },
    { target: "facturesRecues", title: "Factures recues", icon: 'file-file-download ' },
    { target: "facturesValides", title: "Factures valides", icon: 'action-done' },
    { target: "bordereaux", title: "Borderaux", icon: 'action-account-balance' },
]
const OngletsUser = Onglets.filter(o => subfunctions.includes(o.target))

export default Onglets