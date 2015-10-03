'use strict'

var cats = [
        {name: 'Smally Cat', img: 'img/smally-cat.jpg', counter: 0},
        {name: 'Stair Cat', img: 'img/stair-cat.jpg', counter: 0},
        {name: 'Sleepy Cat', img: 'img/sleepy-cat.jpg', counter: 0},
    ],
    listContainer = document.getElementById('list-container'),
    catContainer = document.getElementById('cat-container')

cats.forEach(function(cat, index) {
    var item = document.createElement('li')
    item.innerHTML = cat.name
    item.classList.add('list-item')
    item.setAttribute('data-index', index)
    item.addEventListener('click', showCat)
    listContainer.appendChild(item)
})

function showCat (event) {
    var index = parseInt(event.target.getAttribute('data-index')),
        cat = cats[index],
        catCounter,
        catImg,
        catsHtml =
            '<div>' +
            '   <span id="cat-name">' + cat.name + ' - </span>' +
            '   <span id="cat-counter">' + cat.counter + '</span>' +
            '   <img id="cat-img" src="' + cat.img + '" alt="Click me <3">' +
            '</div>'

    catContainer.innerHTML = catsHtml

    catCounter = document.getElementById('cat-counter')
    catImg = document.getElementById('cat-img')

    catImg.addEventListener('click', function() {
        catCounter.innerHTML = ++cat.counter
    })
}
