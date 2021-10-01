import FormContact from "./FormContact.js";
import Tag from "./Tag.js";

export default class Photographer {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.portrait = data.portrait
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.tags = data.tags
        Photographer.instances = [...Photographer.instances, this]
        
        this.element = this.getView()
    }

    static instances = []

    getView = () => {
        let path = window.location.pathname.split('/')
        path = path[path.length - 1]

        switch (path) {
            case "":
            case "index.html":
                return this.thumbnail()
                break;
            case "photographer.html":
                return this.profil()
                break;
            default:
                break;
        }
    }

    thumbnail = () => {
        let element = document.createElement('article')
        element.setAttribute('class', 'photographer-thumbnail')
        element.setAttribute('data-id', this.id)

        element.innerHTML =
        `<a class="photographer__profil" href="photographer.html?id=${this.id}">
            <img class="photographer__profil__img" src="imgs/photos/Photographers_ID_Photos/${this.portrait}" alt="">
            <h2 class="photographer__profil__name">${this.name}</h2>
        </a>
        <div class="photographer__infos">
            <p class="photographer__infos__city">${this.city}, ${this.country}</p>
            <p class="photographer__infos__tagline">${this.tagline}</p>
            <p class="photographer__infos__price">${this.price}€/jour</p>
        </div>`

        let tagsList = document.createElement('ul')
        tagsList.setAttribute('class', 'tag-list photographer__tags')

        let tags = this.tags.map(tag => new Tag(tag))

        tags.forEach(tag => {
            tagsList.appendChild(tag.element)
        })

        element.appendChild(tagsList)

        return element
    }

    profil = () => {

        // Création des éléments du profil
        let container = document.createElement('section')
        let infosElement = document.createElement('div')
        let contactBtn = document.createElement('button')
        let pictureElement = document.createElement('img')

        // Ajout des attributs aux éléments
        container.setAttribute('id', 'photographer-profil')
        container.setAttribute('class', 'photographer-profil')
        infosElement.setAttribute('class', 'photographer__infos')
        contactBtn.setAttribute('class', 'btn photographer__btn')
        pictureElement.setAttribute('class', 'photographer__img')
        pictureElement.setAttribute('src', `imgs/photos/Photographers_ID_Photos/${this.portrait}`)
        
        // Ajout du contenu dans l'élément infos
        infosElement.innerHTML=
        `<h1 class="photographer__infos__name">${this.name}</h1>
        <p class="photographer__infos__city">${this.city}, ${this.country}</p>
        <p class="photographer__infos__tagline">${this.tagline}</p>`

        let tagsList = document.createElement('ul')
        tagsList.setAttribute('class', 'tag-list')

        let tags = this.tags.map(tag => new Tag(tag))

        tags.forEach(tag => {
            tagsList.appendChild(tag.element)
        })

        infosElement.appendChild(tagsList)

        // Ajout du text dans le bouton de contact

        contactBtn.innerHTML = "Contactez-moi"

        // Ajout des éléments au container

        container.appendChild(infosElement)
        container.appendChild(contactBtn)
        container.appendChild(pictureElement)

        // Ajout de l'event click sur le bouton de contact
        contactBtn.addEventListener('click', () => FormContact.open())

        return container
    }

    static setVisbilityFromFilters = () => {

        Photographer.instances.forEach(photographer => {
            let res = photographer.tags.filter(tag => Tag.activeTags.includes(tag))
            photographer.element.style.display = res.length == Tag.activeTags.length ? "block" : "none"
        })
    }
}