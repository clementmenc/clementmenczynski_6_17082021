import Media from "./Media.js"

export default class CardInfos {
    constructor (price, target) {
        CardInfos.price = price
        CardInfos.target = target
        CardInfos.view()
    }

    static target
    static price
    static counter

    static getTotalLike = () => {
        let i = 0
        Media.instances.forEach(instance => {
            i = i + instance.likes
        })

        return i
    }

    static updateTotalLike = () => {
        console.log('called');
        let total = CardInfos.getTotalLike()
        console.log(CardInfos.counter);
        CardInfos.counter.innerHTML = total
    }

    static view = () => {
        let counterContainer = document.createElement('div')
        counterContainer.setAttribute('class', 'card-infos__nb-likes')

        let nbLike = document.createElement('span')
        nbLike.setAttribute('class', 'nb-likes')
        nbLike.innerHTML = CardInfos.getTotalLike()
        CardInfos.counter = nbLike

        counterContainer.appendChild(CardInfos.counter)
        counterContainer.innerHTML += `<i class="fas fa-heart" aria-label="likes"></i>`
    
        CardInfos.target.appendChild(counterContainer)
        CardInfos.target.innerHTML += `<p>${CardInfos.price}€ / jour</p>`
    }
}