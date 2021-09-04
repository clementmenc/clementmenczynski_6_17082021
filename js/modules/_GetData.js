export default class GetData {
    constructor (data) {
        this.photographers = data.photographers
        this.media = data.media
    }

    getPhotographers = () => {
        return this.photographers
    }

    getPhotographer = (id) => {
        return this.getPhotographers().find(elem => elem.id === id)
    }

    getTags = () => {
        const photographers = this.getPhotographers()
        let allTags = []

        photographers.forEach(photographer => {
            let tagsPhotographer = photographer.tags
            
            tagsPhotographer.forEach(tag => {
                if (!allTags.includes(tag)) {
                    allTags = [...allTags, tag]
                }
            })
        })

        return allTags
    }

    getMediaFromPhotographer = (id) => {
        return this.media.filter(media => media.photographerId == id)
    }

}