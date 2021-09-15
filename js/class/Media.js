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

    static getGallery = () => {
        let newElement = document.createElement('section')
        newElement.setAttribute('class', 'gallery')

        Media.instances.forEach(item => newElement.appendChild(item.getArticle()) )

        return newElement
    }

    getArticle = () => {
        let newElement = document.createElement('article')
        newElement.setAttribute('class', 'media')

        newElement.innerHTML = `
        <a href="" class="media__link">
            ${this.getThumbnail()}
        </a>
        <footer class="media__infos">
            <p class="media__infos__title">${this.title}</p>
            <div class="media__infos__likes">
                <span class="media__infos__likes-nb">${this.likes}</span>
                <i class="fas fa-heart media__infos__likes-icon" aria-label="likes"></i>
            </div>
        </footer>`

        return newElement
    }

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