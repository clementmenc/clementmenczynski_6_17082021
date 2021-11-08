const main = document.getElementsByTagName('main')

export default class Error {

    /**
     * Cette fonction redirige vers la page d'acceuil et stock le message d'erreur pour l'afficher
     * @param {string} error 
     */
    static redirectIndex = (error) => {
        sessionStorage.setItem('error', error)
        window.location.href = "index.html"
    }

    /**
     * Cette fonction créer et affiche un message d'erreur
     * @param {string} errorMsg 
     * @param {boolean} returnHome 
     */
    static print = (errorMsg, returnHome) => {


        if (returnHome) {
            main[0].innerHTML += `<div class="msg-error"><p>${errorMsg}</p><a href="index.html">Retour à l'accueil</a></div>`
        }else{
            main[0].innerHTML = `<div class="msg-error"><p>${errorMsg}</p></div>`
        }
    }
}