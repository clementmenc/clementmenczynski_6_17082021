// IMPORT DES MODULES
import GetData from "./modules/_GetData.js"
import {createFiltersList, createPhotographerThumbnail} from "./modules/_createElements.js"

const FILTERSCONTAINER = document.getElementById('categories')
const PHOTOGRAPHERSLIST = document.getElementById('photographers-list')


const api = async (url) => {
    const data = await fetch(url)
    return await data.json()
}

(async () => {
    const data = new GetData(await api('./FishEyeData.json'));

    if(window.location.pathname == '/' || window.location.pathname == '/index.html'){
        FILTERSCONTAINER.appendChild(createFiltersList(data.getTags()))

        data.getPhotographers().forEach(photographer => {
            PHOTOGRAPHERSLIST.appendChild(createPhotographerThumbnail(photographer))
        })
        
    }
})()