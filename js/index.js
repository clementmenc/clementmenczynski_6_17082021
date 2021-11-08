// -----------------------------------------
// Import des classes
// -----------------------------------------

import Api from './class/Api.js'
import Error from './class/Error.js'
import Tag from './class/Tag.js'
import Photographer from './class/Photographer.js'

// -----------------------------------------
// Définition des cibles sur le document
// -----------------------------------------

let tagTarget = document.getElementById('tags')
let photographerTarget = document.getElementById('photographers-list')

// -----------------------------------------
// Fonctions
// -----------------------------------------

const injectElement = (element, target) => {
    target.appendChild(element)
}

// -----------------------------------------
// Comportement par défaut (une fois la page chargé)
// -----------------------------------------

// const connected = await Api.init()

try {
    await Api.init()
} catch (error) {
    Error.print(error)
}

// Tags

    // Configuration du comportement des tags sur la pages
    Tag.config({
        oneAtTime: false,
        callback: () => { Photographer.setVisbilityFromFilters() }
    })

    // Création des éléments
    Api.getAllTags().forEach(tag => new Tag(tag))

    // Injection dans le document
    Tag.instances.forEach(i => {
        injectElement(i.element, tagTarget)
    })


// Photographe

    // Création des éléments
    Api.getAllPhotographers().forEach(p => new Photographer(p))

    // Injection dans le document
    Photographer.instances.forEach(i => {
        injectElement(i.element, photographerTarget)
    })