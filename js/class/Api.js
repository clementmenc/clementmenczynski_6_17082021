import Error from './Error.js'

export default class Api {

    static photographers
    static medias

    static init = async () => {
        const req = await fetch('./FishEyeData.json')
        const data =  await req.json()

        Api.photographers = data.photographers
        Api.medias = data.media
    }

    static getAllPhotographers = () => {
        return Api.photographers
    }

    static getPhotographerById = (id) => {
        id = parseInt(id, 10)

        if (!isNaN(id)) {
            const res = Api.photographers.find(photographer => photographer.id === id)
            return res || Error.print("Ce photographe n'existe pas")
        }
    }

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

    static getMediaFromPhotographer = (id) => {
        return Api.medias.filter(media => media.photographerId == id)
    }
}