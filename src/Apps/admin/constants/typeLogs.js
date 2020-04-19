const CONNEXION = 'CONNEXION'
const CREATION = 'CREATION'
const SUPPRESSION = 'SUPPRESSION'
const MODIFICATION = 'MODIFICATION'

const typeLogs = [
    {
        type: CONNEXION,
        nom: CONNEXION.toLowerCase()
    },
    {
        type: CREATION,
        nom: CREATION.toLowerCase()
    },
    {
        type: SUPPRESSION,
        nom: SUPPRESSION.toLowerCase()
    },
    {
        type: MODIFICATION,
        nom: MODIFICATION.toLowerCase()
    }
]

export default typeLogs