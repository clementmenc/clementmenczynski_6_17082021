import Media from "./Media.js";

export default class Gallery {
    constructor (medias, target) {
        medias.forEach(media => new Media(media))

        Gallery.target = target
        Gallery.sortBy("popularity")
    }

    static target

    /**
     * Créer et retourne la gallery de photo (section)
     * @returns {HTMLElement} HTMLElement
     */
    static fill = (medias) => {
        Gallery.target.innerHTML = ""
        let elements = medias
        elements.forEach(item => Gallery.target.appendChild(item.element || item.getArticle()))
    }

    /**
     * Tri les medias avec le paramètre choisi et appel la fonction de remplissage
     * @param {String} what 
     */
    static sortBy = (what) => {
        let medias = [...Media.instances]
        switch (what) {
            case 'date':
                medias.sort((a,b) => new Date(b.date) - new Date(a.date))
                break;

            case 'title':
                medias.sort((a,b) => a.title.localeCompare(b.title))
                break;

            default:
                medias.sort((a,b) => a.likes - b.likes)
                break;
        }

        Gallery.fill(medias)
    }

}