import Media from "./Media.js"

export default class CardInfos {
    constructor (price, target) {
        CardInfos.price = price
        CardInfos.target = target
        CardInfos.view()
    }

    static target
    static price

    static getTotalLike = () => {
        let i = 0
        Media.instances.forEach(instance => {
            i = i + instance.likes
        })

        return i
    }

    static updateTotalLike = () => {
        let total = CardInfos.getTotalLike()
        document.getElementById('counter-likes').innerHTML = total
    }

    static view = () => {
        let counterContainer = document.createElement('div')
        counterContainer.setAttribute('class', 'card-infos__nb-likes')

        let nbLike = document.createElement('span')
        nbLike.setAttribute('id', 'counter-likes')
        nbLike.setAttribute('class', 'nb-likes')
        nbLike.innerHTML = CardInfos.getTotalLike()

        counterContainer.appendChild(nbLike)
        counterContainer.innerHTML += `<i class="fas fa-heart" aria-label="likes"></i>`
    
        CardInfos.target.appendChild(counterContainer)
        CardInfos.target.innerHTML += `<p>${CardInfos.price}€ / jour</p>`
    }
}