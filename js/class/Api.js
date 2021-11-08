import Error from './Error.js'

/**
 * Cette classe simule une api, elle devra être modifier une fois l'api créer
 */
export default class Api {

    static photographers
    static medias

    /**
     * Cette fonction récupère les données du fichier Json et les stocks dans des variables statiques
     */
    static init = async () => {
            const req = await fetch('./FishEyeData.json')
            if (!req.ok) {
                throw "Données momentanément indisponible"
            }
            const data =  await req.json()

            Api.photographers = data.photographers
            Api.medias = data.media        
    }

    /**
     * Cette fonction récupère tout les photographes
     * @returns {object}
     */
    static getAllPhotographers = () => {
        return Api.photographers
    }

    /**
     * Cette fonction récupère les informations d'un photographe via son id
     * @param {number} id 
     * @returns {object}
     */
    static getPhotographerById = (id) => {
        id = parseInt(id, 10)

        if (!isNaN(id)) {
            const res = Api.photographers.find(photographer => photographer.id === id)
            return res || Error.print("Ce photographe n'existe pas", true)
        }
    }

    /**
     * Cette fonction récupère tout les tags de tout les photographes
     * @returns {array}
     */
    static getAllTags = () => {
        let allTags = []

        Api.photographers.forEach(photographer => {
            let tagsPhotographer = photographer.tags
            
            tagsPhotographer.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags = [...allTags, tag]
                }
            })
        })

        return allTags
    }

    /**
     * Cette fonction récupère tout les médias d'un photographe
     * @param {number} id 
     * @returns 
     */
    static getMediaFromPhotographer = (id) => {
        return Api.medias.filter(media => media.photographerId == id)
    }
}