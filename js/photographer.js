// -----------------------------------------
// Import des classes
// -----------------------------------------

import Api from './class/Api.js'
import Tag from './class/Tag.js'
import Error from './class/Error.js'
import Photographer from './class/Photographer.js'
import SortDropDown from './class/SortDropDown.js'
import Media from './class/Media.js'
import CardInfos from './class/CardInfos.js'
import FormContact from './class/FormContact.js'

// -----------------------------------------
// Définition des cibles sur le document
// -----------------------------------------

const photographerTarget = document.getElementById('photographer-profil')
const sortTarget = document.getElementById('sort')
const mediaTarget = document.getElementById('gallery')
const cardInfosTarget = document.getElementById('card-infos')

// -----------------------------------------
// Fonctions
// -----------------------------------------

const injectElement = (element, target) => {
    if (element.id == target.id) {
        target.parentNode.replaceChild(element, target)
    } else {
        target.appendChild(element)
    }
}

const getParam = (param) => {
    let search = window.location.search
    let result = new URLSearchParams(search).get(param)

    if (result != null) {
        return result
    }

    return false
}

// -----------------------------------------
// Comportement par défaut (une fois la page chargé)
// -----------------------------------------

try {
    await Api.init()
} catch (error) {
    Error.print(error, true)
}

// Configuration du comportement des tags sur la pages

Tag.config({
    oneAtTime: true,
    callback: () => { Media.setVisbilityFromFilters() }
})

// Photographe

    // Récupération de l'ID du photographe
    const photographerId = getParam('id')

    // Création des éléments
    let photographer = new Photographer(Api.getPhotographerById(photographerId))

    // Injection dans le document
    Photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })

// Trier par

    // Création d'un élément de tri
    const sort = new SortDropDown()

    // Injection dans le document
    injectElement(sort.getView(), sortTarget)

// Gallerie photos

    // Récupération des medias du photographe
    const medias = Api.getMediaFromPhotographer(photographerId)

    // Création des médias
    medias.forEach(media => new Media(media, mediaTarget))
    // Tri par defaut
    Media.sortBy(SortDropDown.value)

// Carte infos photographe (total likes et prix)

    // Création de l'élément
    const cardInfos = new CardInfos(photographer.price)

    // Injection dans le document
    injectElement(cardInfos.getView(), cardInfosTarget)


// Initialisation du formulaire de contact

    FormContact.init()