import Media from './Media.js'

export default class CardInfos {
    constructor (price) {
        this.price = price
    }

    /**
     * Modifie le nombre total de like du photographe courant sur la vue
     */
    static updateTotalLike = () => {
        document.getElementById('counter-likes').innerHTML = Media.totalLikes
    }

    /**
     * Cette fonction créer la vue de la card d'information du photographe (nombre de like total + prix)
     * @returns {HTMLElement}
     */
    getView = () => {
        let container = document.createElement('aside')
        container.setAttribute('id', "card-infos")
        container.setAttribute('class', "card-infos")

        let counterLike = document.createElement('div')
        counterLike.setAttribute('class', 'card-infos__nb-likes')
        counterLike.innerHTML =
        `<span id="counter-likes" class="nb-likes">${Media.totalLikes}</span>
        <i class="fas fa-heart" aria-label="likes"></i>`

        container.appendChild(counterLike)
        container.innerHTML += `<p>${this.price}€ / jour</p>`

        return container
    }
}