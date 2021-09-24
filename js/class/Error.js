export default class Error {

    static redirectIndex = (error) => {
        sessionStorage.setItem('error', error)
        window.location.href = "index.html"
    }

    static print = (errorMsg) => {
        let container = document.createElement('div')
        container.innerHTML = `<p>${errorMsg}</p>`

        document.body.appendChild(container)
    }
}