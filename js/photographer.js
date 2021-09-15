// IMPORT DES MODULES
import GetData from "./class/GetData.js"
import Photographer from "./class/Photographer.js"
import SortDropDown from "./class/SortDropDown.js";
import Media from "./class/Media.js";


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

    // Récupération de l'ID du photographe demandé
    const photographerId = getParam('id')

    // Définition des cibles pour les éléments générés
    const photographerTarget = document.getElementById('photographer-profil')
    const sortTarget = document.getElementById('sort')
    const galleryTarget = document.getElementById('gallery')

    // Génération des éléments
    const photographer = new Photographer(data.getPhotographer(photographerId))
    const sort = new SortDropDown()
    data.getMediaFromPhotographer(photographerId).forEach(media => {
        new Media(media)
    })

    // Remplacement des cibles par les éléments générés
    sortTarget.parentNode.replaceChild(sort.getView(), sortTarget)
    photographerTarget.parentNode.replaceChild(photographer.profil(), photographerTarget)
    galleryTarget.parentNode.replaceChild(Media.getGallery(), galleryTarget)

    // const medias = new Media(data.getMediaFromPhotographer(photographerId))
    // var video = document.getElementById('videoId');
    // var canvas = document.getElementById('canvasId');
    // var img = document.getElementById('imgId');

    // video.addEventListener('play', function () {
    //     canvas.style.display = 'none';
    //     img.style.display = 'none';
    // }, false);

    // video.addEventListener('pause', function () {
    //     canvas.style.display = 'block';
    //     img.style.display = 'block';

    //     draw(video, canvas, img);
    // }, false);


    // function draw(video, canvas, img) {
    //     var context = canvas.getContext('2d');
    //     context.drawImage(video, 0, 0, canvas.width, canvas.height);

    //     var dataURL = canvas.toDataURL();
    //     img.setAttribute('src', dataURL);
    // }

})()

