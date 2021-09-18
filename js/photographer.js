// IMPORT DES MODULES
import GetData from "./class/GetData.js"
import Photographer from "./class/Photographer.js"
import SortDropDown from "./class/SortDropDown.js"
import Media from "./class/Media.js"
import Gallery from "./class/Gallery.js"
import CardInfos from "./class/CardInfos.js"


const api = async (url) => {
    const data = await fetch(url)
    return await data.json()
}

const getParam = (param) => {
    let search = window.location.search
    let result = new URLSearchParams(search).get(param)

    if (result != null) {
        return result
    }

    return false
}

(async () => {
    // Récupération des données
    const data = new GetData(await api('./FishEyeData.json'));

    // Récupération de l'ID du photographe
    const photographerId = getParam('id')

    // Récupération des médias du photographe
    const medias = data.getMediaFromPhotographer(photographerId)

    // Définition des cibles pour les éléments générés
    const photographerTarget = document.getElementById('photographer-profil')
    const sortTarget = document.getElementById('sort')
    const galleryTarget = document.getElementById('gallery')
    const cardInfosTarget = document.getElementById('card-infos')

    // Génération des éléments
    const photographer = new Photographer(data.getPhotographer(photographerId))
    const sort = new SortDropDown()

    new Gallery(medias, galleryTarget)
    new CardInfos(photographer.price, cardInfosTarget)


    // Remplacement des cibles par les éléments générés
    sortTarget.parentNode.replaceChild(sort.getView(), sortTarget)
    photographerTarget.parentNode.replaceChild(photographer.profil(), photographerTarget)


    // Ajout du comportement de like
    let likeBtn = document.getElementsByClassName('media__infos__likes-icon')

    for (const btn of likeBtn) {
        btn.addEventListener('click', Media.like)
    }
})()