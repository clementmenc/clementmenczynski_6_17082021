import CardInfos from "./CardInfos.js"
import Tag from "./Tag.js"
import LightBox from "./LightBox.js"

export default class Media {
    constructor (data, target) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.date = data.date
        this.likes = data.likes
        this.title = data.title
        this.tags = data.tags
        this.img = data.image
        this.video = data.video
        this.price = data.price
        this.liked = false
        this.element = this.getView()
        Media.target = target


        Media.totalLikes += this.likes
        Media.instances = [...Media.instances, this]
    }

    static target
    static instances = []
    static totalLikes = 0

    static fill = () => {
        Media.target.innerHTML = ""
        Media.instances.forEach(media => Media.target.appendChild(media.element))
    }

    static sortBy = (what) => {
        let element = [...Media.instances]
        switch (what) {
            case 'date':
                element.sort((a,b) => new Date(b.date) - new Date(a.date))
                break;

            case 'title':
                element.sort((a,b) => a.title.localeCompare(b.title))
                break;

            default:
                element.sort((a,b) => a.likes - b.likes)
                break;
        }

        Media.instances = element
        Media.fill()
    }

    static setVisbilityFromFilters = () => {

        Media.instances.forEach(media => {
            let res = media.tags.filter(tag => Tag.activeTags.includes(tag))
            media.element.style.display = res.length == Tag.activeTags.length ? "block" : "none"
        })
    }

    like = () => {
        if (this.liked){
            this.likes -= 1
            Media.totalLikes -= 1
        } else {
            this.likes += 1
            Media.totalLikes += 1
        }

        this.likeBtn.classList.toggle('fas')
        this.likeBtn.classList.toggle('far')
        this.liked = !this.liked
        this.likeCount.innerHTML = this.likes
        CardInfos.updateTotalLike()
    }

    getView = () => {
        let container = document.createElement('article')
        container.setAttribute('class', 'media')

        let media = document.createElement('div')
        media.setAttribute('class', 'media__link')
        media.setAttribute('class', 'media__link')
        media.innerHTML = this.getThumbnail()
        media.addEventListener('click', () => new LightBox(Media.instances, Media.instances.indexOf(this)) )

        let footer =  document.createElement('footer')
        footer.setAttribute('class', 'media__infos')
        footer.innerHTML = `<p class="media__infos__title">${this.title}</p>`

        let like = document.createElement('div')
        like.setAttribute('class', 'media__infos__likes')

        let likeNb = document.createElement('span')
        likeNb.setAttribute('class', 'media__infos__likes-nb')
        likeNb.innerHTML = this.likes

        this.likeCount = likeNb


        like.appendChild(likeNb)
        like.appendChild(this.getLikeBtn())
        footer.appendChild(like)
        container.appendChild(media)
        container.appendChild(footer)

        return container
    }

    getLikeBtn = () => {
        let likeBtn = document.createElement('i')
        likeBtn.setAttribute('class', 'far fa-heart media__infos__likes-icon')
        likeBtn.setAttribute('aria-label', 'likes')

        likeBtn.addEventListener('click', this.like)

        this.likeBtn = likeBtn
        return likeBtn
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