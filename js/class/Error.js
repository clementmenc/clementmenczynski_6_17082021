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
     */
    static print = (errorMsg) => {
        let container = document.createElement('div')
        container.innerHTML = `<p>${errorMsg}</p>`

        document.body.appendChild(container)
    }
}