// IMPORT DES MODULES
import GetData from "./class/GetData.js"
import Photographer from "./class/Photographer.js"
import Filter from "./class/Filter.js"

const FILTERSCONTAINER = document.getElementById('categories')
const PHOTOGRAPHERSLIST = document.getElementById('photographers-list')

const api = async (url) => {
    const data = await fetch(url)
    return await data.json()
}

(async () => {
    const data = new GetData(await api('./FishEyeData.json'));

    let filterList = document.createElement('ul')
    filterList.setAttribute('class', 'tag-list')

    let filters = data.getTags().map(tag => new Filter(tag))
    filters.map(filter => {
        filterList.appendChild(filter.element)
    })
    FILTERSCONTAINER.appendChild(filterList)

    data.getPhotographers().forEach(photographer => {
        photographer = new Photographer(photographer)
        PHOTOGRAPHERSLIST.appendChild(photographer.thumbnail())
    })

})()