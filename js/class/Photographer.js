import Filter from "./Filter.js";

export default class Photographer{
    constructor (data) {
        this.id = data.id
        this.name = data.name
        this.portrait = data.portrait
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.tags = data.tags
        Photographer.instances = [...Photographer.instances, this]
    }

    static instances = []

    /**
     * Créer et retourne la thumbnail du photographe
     * @returns {HTMLElement} HTMLElement
     */
    thumbnail = () => {
        let newElement = document.createElement('article')
        newElement.setAttribute('class', 'photographer-thumbnail')
        newElement.setAttribute('data-id', this.id)

        newElement.innerHTML =
        `<a class="photographer__profil" href="photographer.html?id=${this.id}">
            <img class="photographer__profil__img" src="imgs/photos/Photographers_ID_Photos/${this.portrait}" alt="">
            <h2 class="photographer__profil__name">${this.name}</h2>
        </a>
        <div class="photographer__infos">
            <p class="photographer__infos__city">${this.city}, ${this.country}</p>
            <p class="photographer__infos__tagline">${this.tagline}</p>
            <p class="photographer__infos__price">${this.price}€/jour</p>
        </div>`

        let filterList = document.createElement('ul')
        filterList.setAttribute('class', 'tag-list photographer__tags')

        let filters = this.tags.map(tag => new Filter(tag))

        filters.forEach(filter => {
            filterList.appendChild(filter.element)
        })
        
        newElement.appendChild(filterList)

        this.element = newElement
        return newElement
    }

    /**
     * Créer et retourne le profil du photographe
     * @returns {HTMLElement} HTMLElement
     */
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

        let filterList = document.createElement('ul')
        filterList.setAttribute('class', 'tag-list')

        let filters = this.tags.map(tag => new Filter(tag))

        filters.forEach(filter => {
            filterList.appendChild(filter.element)
        })

        infosElement.appendChild(filterList)

        // Ajout du text dans le bouton de contact

        contactBtn.innerHTML = "Contactez-moi"

        // Ajout des éléments au container

        container.appendChild(infosElement)
        container.appendChild(contactBtn)
        container.appendChild(pictureElement)

        this.element = container
        return container
    }

    /**
     * Détermine si chaque photographe doit être visible ou masqué en fonction des filtres actifs
     */
    static setVisbilityFromFilters = () => {

        Photographer.instances.forEach(photographer => {
            let res = photographer.tags.filter(tag => Filter.activeFilters.includes(tag))
            photographer.element.style.display = res.length == Filter.activeFilters.length ? "block" : "none"
        })
    }
}