const permissionsJSON = {
    "nomapp": "GAP",
    "functions": [
        {
            "name": "Accueil",
            "subfunctions": []
        },
        {
            "name": "Admission",
            "subfunctions": [
                { "target": "listPatient" },
                { "target": "dossiersPatient" }
            ]
        },
        {
            "name": "Caisse",
            "subfunctions": [
                { "target": "attenteFacture" },
                { "target": "patientFacture" },
                { "target": "avoirFacture" },
                { "target": "compte" }
            ]
        },
        {
            "name": "Statistiques",
            "subfunctions": [
                { "target": "bordereaux" }
            ]
        },
        {
            "name": "Assurance",
            "subfunctions": [
                { "target": "listeAssurances" },
                { "target": "facturesRecues" },
                { "target": "facturesValides" },
                { "target": "bordereaux" }
            ]
        }
    ]
}

const permissionsSTRING = JSON.stringify(permissionsJSON)
console.log(permissionsSTRING);