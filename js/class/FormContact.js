import Photographer from "./Photographer.js"

const _modal = document.getElementById('modal-form')
const _form = document.getElementById('contact-form')
const _closeModalBtn = document.getElementById('closeModal')
const _submitBtn = document.getElementById('submitForm')

const _regex = {
    text : /^[a-zA-Z \-àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$/,
    email : /^[a-z0-9._-]+@{1}[a-z0-9.-_]{2,}[.]{1}[a-z]{2,5}$/
}
const _errors = {
    empty : "Veuillez renseigner ce champ.",
    names : {
        invalid : "Caractère utilisé non valide, utilisez uniquement des lettres, espaces et '-'.",
        length : "Ce champ doit comporter au moins 2 caractères."
    },
    email : {
        empty : "Veuillez renseigner votre adresse email.",
        invalid : "L'adresse e-mail n'est pas valide."
    }
}

let entriesValidation = {}


const open = () => {
    _modal.classList.add('open')
    _modal.focus()
    document.body.classList.add('no-scroll')
    document.addEventListener('keydown', bindKeys)
}

const close = (e) => {
    if(!e || e.target == _modal || e.target == _closeModalBtn){
        _modal.classList.remove('open')
        document.body.classList.remove('no-scroll')
        document.getElementById('contact-btn').focus()
        document.removeEventListener('keydown', bindKeys)
    }
}

const bindKeys = (e) => {
    e.key === "Escape" && close()

    if(e.key === "Tab" && e.target === _closeModalBtn){
        e.preventDefault()
        _form.focus()
    }
}


/**
 * Initialise la vue et set les events
 */
const init = () => {

    // Initialisation de la vue
    let name = Photographer.instances[0].name
    let formulaire = document.getElementById('contact-form')
    document.getElementById('form-name').innerHTML += name

    // Ajout des Events lier au formulaire
    _modal.addEventListener('click', close)
    _submitBtn.addEventListener('click', (e) => {
        e.preventDefault()

        if(formValidate(entriesValidation)){
            let data = new FormData(_form) // Contient les données du formulaire validé

            // console log des données du formulaire
            console.group('Données du formulaire')
            for(let a of data.entries()) { console.log(a[0]+ ' : '+ a[1]) }
            console.groupEnd()
            // -----------------------------
            // Ajouter le code asynchrone ici
            // -----------------------------

            // À appeller quand l'envoi asynchrone répond avec un status 200 (Ok)
            _form.reset()
            Object.values(entriesValidation).forEach( value => {
                value.validate = false
            })
        }
    });

    // Ajout des Events lier à la saisi
    [...formulaire.elements].forEach(entry => {
        if (entry.nodeName === "INPUT" || entry.nodeName === "TEXTAREA") {

            if (entry.nodeName === "INPUT" && entry.type === "text") {
                entriesValidation[entry.id] = {
                    validate : false,
                    controlFunc() { inputTextControl(entry, _regex.text, 2) }
                }
            } else if (entry.nodeName === "INPUT" && entry.type === "email") {
                entriesValidation[entry.id] = {
                    validate : false,
                    controlFunc() { inputEmailControl(entry, _regex.email) }
                }
            } else if (entry.nodeName === "TEXTAREA") {
                entriesValidation[entry.id] = {
                    validate : false,
                    controlFunc() { inputTextareaControl(entry, 2) }
                }
            }

            entry.addEventListener('input', () => entriesValidation[entry.id].controlFunc())
        }
    })

}

/**
 * Cette fonction controle la saisi de l'utilisateur sur un champ input type text
 * @param {object} entry 
 * @param {regex} regex 
 * @param {number} minLength 
 * @param {number} maxLength 
 */
const inputTextControl = (entry, regex, minLength = 1, maxLength) => {
    let value = entry.value

    if (value.length >= minLength && (value.length <= maxLength || maxLength === undefined )) {
        if (value.match(regex) != null) {
            entriesValidation[entry.id].validate = true
            removeError(entry)
        }else{
            entriesValidation[entry.id].validate = false
            setError(entry, _errors.names.invalid)
        }
    }else{
        entriesValidation[entry.id].validate = false
        value == "" ? setError(entry, _errors.empty) : setError(entry, _errors.names.length)
    }
}

/**
 * Cette fonction controle la saisi de l'utilisateur sur un champ input type email
 * @param {object} entry 
 * @param {regex} regex 
 */
const inputEmailControl = (entry, regex) => {
    let value = entry.value

    if (value.match(regex) != null) {
        entriesValidation[entry.id].validate = true
        removeError(entry)
    }else{
        entriesValidation[entry.id].validate = false
        value == "" ? setError(entry, _errors.email.empty) : setError(entry, _errors.email.invalid)
    }
}

/**
 * Cette fonction controle la saisi de l'utilisateur sur un champ textarea
 * @param {object} entry 
 * @param {number} minLength 
 * @param {number} maxLength 
 */
const inputTextareaControl = (entry, minLength = 1, maxLength) => {
    let value = entry.value

    if (value.length >= minLength && (value.length <= maxLength || maxLength === undefined )) {
        entriesValidation[entry.id].validate = true
        removeError(entry)
    }else{
        entriesValidation[entry.id].validate = false
        value == "" ? setError(entry, _errors.empty) : setError(entry, _errors.names.length)
    }
}

/**
 * Cette fonction controle si tout les champs sont renseigné correctement
 * @param {object} entries 
 * @returns {boolean}
 */
const formValidate = (entries) => {
    let formCompleted = true
    Object.entries(entries).forEach( ([key, value]) => {
        if(!value.validate){
            value.controlFunc()
            formCompleted = false
        }
    })

    return formCompleted
}


/**
 * Cette fonction créer une erreur sur un element du formulaire
 * @param {object} elem 
 * @param {string} error 
 */
const setError = (elem, error) => {
    let target = NodeList.prototype.isPrototypeOf(elem) ? elem[0].parentNode : elem.parentNode
    while (!target.classList.contains('form__item')) {
        target = target.parentNode
    }

    target.setAttribute("data-error", error)
}

/**
 * Cette fonction supprime une erreur d'un element du formulaire
 * @param {object} elem 
 */
const removeError = (elem) => {

    let target = NodeList.prototype.isPrototypeOf(elem) ? elem[0].parentNode : elem.parentNode
    
    while (!target.classList.contains('form__item')) {
        target = target.parentNode
    }

    target.removeAttribute("data-error")
}


const FormContact = {
    init : init,
    open : open,
    close : close
}

export default FormContact