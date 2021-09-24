export default class LightBox {
    constructor (elemList, currentIndex) {
        this.elements = elemList
        this.id = currentIndex
        this.current = this.elements[this.id]
        this.target = document.getElementById('modal-lightbox')


        this.render()
        this.open()
    }

    getView = () => {

        let container = document.createElement('div')
        container.setAttribute('class', 'lightbox__container')

        let mediaContainer = document.createElement('div')
        mediaContainer.setAttribute('class', 'media-container')
        this.mediaContainer = mediaContainer

        let title = document.createElement('p')
        title.setAttribute('class', 'title')
        title.innerHTML = this.current.title
        this.title = title

        let arrowLeft = document.createElement('button')
        arrowLeft.setAttribute('class', 'arrow-left')
        arrowLeft.innerHTML = `<i role="link" class="fas fa-chevron-left"></i>`
       arrowLeft.addEventListener('click', () => this.prevMedia())

        let arrowRight = document.createElement('button')
        arrowRight.setAttribute('class', 'arrow-right')
        arrowRight.innerHTML = `<i role="link" class="fas fa-chevron-right"></i>`
        arrowRight.addEventListener('click', () => this.nextMedia())

        let closeBtn = document.createElement('button')
        closeBtn.setAttribute('class', 'close')
        closeBtn.innerHTML = `<i class="fas fa-times"></i>`
        closeBtn.addEventListener('click', () => this.close())


        mediaContainer.appendChild(this.getMedia())

        container.appendChild(mediaContainer)
        container.appendChild(title)
        container.appendChild(arrowLeft)
        container.appendChild(arrowRight)
        container.appendChild(closeBtn)

        return container
    }

    open = () => {
        this.target.classList.add('open')
        document.addEventListener('keydown', this.keyControl)
    }

    close = () => {
        this.target.classList.remove('open')
        document.removeEventListener('keydown', this.keyControl)

    }

    keyControl = (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                this.prevMedia()
                break;
            case 'ArrowRight':
                this.nextMedia()
                break;
            case 'Escape':
                this.close()
            break;
            default:
                break;
        }
    }

    nextMedia = () => {
        this.id = (this.id + 1 >= this.elements.length) ? 0 : this.id + 1
        this.current = this.elements[this.id]
        this.title.innerHTML = this.current.title
        this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0])
    }

    prevMedia = () => {
        this.id = (this.id - 1 == -1) ? this.elements.length - 1 : this.id - 1
        this.current = this.elements[this.id]
        this.title.innerHTML = this.current.title
        this.mediaContainer.replaceChild(this.getMedia(), this.mediaContainer.children[0])
    }

    getMedia = () => {
        let media
        if (this.current.img) {
            media = document.createElement('img')
            media.setAttribute('class', 'media')
            media.src = `imgs/photos/${this.current.photographerId}/` + this.current.img
        }else{
            media = document.createElement('video')
            media.setAttribute('class', 'media')
            media.setAttribute('controls', 'true')

            media.innerHTML = `<source src="imgs/photos/${this.current.photographerId}/${this.current.video}" type="video/mp4">`
        }
        this.media = media
        return media
    }

    render = () => {
        this.target.innerHTML = ''
        this.target.appendChild(this.getView())
    }
}