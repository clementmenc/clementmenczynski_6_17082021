import Filter from './Filter.js'

export default class Media {
    constructor (data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.date = data.date
        this.likes = data.likes
        this.title = data.title
        this.tags = data.tags
        this.img = data.image
        this.video = data.video
        this.price = data.price

        Media.instances = [...Media.instances, this]
    }

    static instances = []

    /**
     * Détermine si chaque photographe doit être visible ou masqué en fonction des filtres actifs
     */
    static setVisbilityFromFilters = () => {
        Media.instances.forEach(item => {
            let res = item.tags.filter(tag => Filter.activeFilters.includes(tag))
            item.element.style.display = res.length == Filter.activeFilters.length ? "block" : "none"
        })
    }

    static sortBy = (what) => {
        let element = Media.instances
        switch (what) {
            case 'date':
                element.sort((a,b) => a.date - b.date)
                break;

            case 'title':
                element.sort((a,b) => a.title - b.title)
                break;

            default:
                element.sort((a,b) => a.likes - b.likes)
                break;
        }

        Media.setGalleryOrder(element)
    }

    /**
     * Créer et retourne l'article de la photo
     * @returns {HTMLElement} HTMLElement
     */
    getArticle = () => {
        let newElement = document.createElement('article')
        newElement.setAttribute('class', 'media')

        newElement.innerHTML = `
        <div href="" class="media__link">
            ${this.getThumbnail()}
        </div>
        <footer class="media__infos">
            <p class="media__infos__title">${this.title}</p>
            <div class="media__infos__likes">
                <span class="media__infos__likes-nb">${this.likes}</span>
                <i class="fas fa-heart media__infos__likes-icon" aria-label="likes"></i>
            </div>
        </footer>`

        this.element = newElement
        return newElement
    }

    /**
     * Créer et retourne la thumbnail de la photo
     * @returns {HTMLElement} HTMLElement
     */
    getThumbnail = () => {
        if (this.img) {
            return `<img class="media__link__img" src="imgs/photos/${this.photographerId}/${this.img}" alt="">`
        }
        
        if (this.video){
            return `<video class="media__link__video">
                        <source src="imgs/photos/${this.photographerId}/${this.video}" type="video/mp4">
                    </video>`
        }

        return "<p>Aucun média n'a été trouvé</p>"
    }
}