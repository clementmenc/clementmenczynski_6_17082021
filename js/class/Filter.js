import Photographer from "./Photographer.js"

export default class Filter{
    constructor(value){
        this.value = value
        this.element = document.createElement('li')
        this.state = false

        this.element.setAttribute('class', 'tag-item')
        this.element.setAttribute('data-active', 'false')
        this.element.setAttribute('data-value', this.value)
        this.element.innerHTML = `<a href="#">${this.value}</a>`

        this.element.addEventListener('click', (e) => {
            e.preventDefault()
            this.setState()

            let path = window.location.pathname.split('/')
            path = path[path.length - 1]

            switch (path) {
                case "":
                case "index.html":
                    Photographer.setVisbilityFromFilters()
                    break;
                case "photographer.html":
                    // Media.setVisbilityFromFilters()
                    break;
                default:
                    break;
            }
        })

        Filter.instances = [...Filter.instances, this]
    }

    static instances = []
    static activeFilters = []

    /**
     * Contrôle l'état original du filtre, modifie sont état et met à jour le style du filtre si besoin
     */
    setState = () => {

        if (this.state) {
            let index = Filter.activeFilters.indexOf(this.value)
            Filter.activeFilters.splice(index, 1)
        } else {
            Filter.activeFilters = [...Filter.activeFilters, this.value]
        }

        Filter.instances.forEach(item => {
            if(item.element.getAttribute('data-value') == this.value) {
                if (item.state) {
                    item.state = false
                    item.element.setAttribute('data-active', 'false')
                } else {
                    item.state = true
                    item.element.setAttribute('data-active', 'true')
                }
            }
        })
    }
}