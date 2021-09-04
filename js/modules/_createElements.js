export const createFiltersList = (filters) => {

    let newElement = document.createElement('ul')

    filters.forEach(filter => {
        newElement.innerHTML += `<li><a href="#">${filter}</a></li>`
    });

    return newElement
}

export const createPhotographerThumbnail = (data) => {

    console.log(data);
    
    let newElement = document.createElement('article')
    newElement.setAttribute('class', 'photographer')

    newElement.innerHTML =
    `<a href="photographer.html?id=${data.id}">
        <img class="photographer__img" src="/imgs/photos/Photographers_ID_Photos/${data.portrait}" alt="" width="200">
        <h2 class="photographer__name">${data.name}</h2>
    </a>
    <div class="photographer__infos">
        <p class="photographer__infos__city">${data.city}, ${data.country}</p>
        <p class="photographer__infos__tagline">${data.tagline}</p>
        <p class="photographer__infos__price">${data.price}€/jour</p>
    </div>`

    let test = createFiltersList(data.tags)
    test.setAttribute('class', 'photographer__tags')
    newElement.appendChild(test)

    return newElement
}