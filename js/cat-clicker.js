'use strict';

(function(){

    var model = {
        init: function() {
            this.cats = [
                {name: 'Smally Cat', img: 'img/smally-cat.jpg', counter: 0},
                {name: 'Stair Cat', img: 'img/stair-cat.jpg', counter: 0},
                {name: 'Sleepy Cat', img: 'img/sleepy-cat.jpg', counter: 0},
                {name: 'Doido Cat', img: 'img/doido-cat.jpg', counter: 0},
            ]
        },
        getAllCats: function() {
            return this.cats
        },
        getCat: function(index) {
            return this.cats[index]
        }
    },

    octopus = {
        init: function() {
            model.init()
            catView.init()
            listView.init()
        },
        getAllCats: function() {
            return model.getAllCats()
        },
        getCat: function(index) {
            return model.getCat(index)
        }
    },

    listView = {
        init: function() {
            this.listContainer = document.getElementById('list-container')
            this.listCats()
        },
        listCats: function() {
            var cats = octopus.getAllCats(),
                self = this
            cats.forEach(function(cat, index) {
                var item = document.createElement('li')
                item.innerHTML = cat.name
                item.classList.add('list-item')
                item.setAttribute('data-index', index)
                item.addEventListener('click', self.showCat)
                self.listContainer.appendChild(item)
            })
        },
        showCat: function(event) {
            var index = parseInt(event.target.getAttribute('data-index'))
            catView.showCat(index)
        }
    },

    catView = {
        init: function() {
            this.catContainer = document.getElementById('cat-container')
        },
        showCat: function(index) {
            var cat = octopus.getCat(index),
                catCounter,
                catImg,
                catsHtml =
                    '<div>' +
                    '   <span id="cat-name">' + cat.name + ' - </span>' +
                    '   <span id="cat-counter">' + cat.counter + '</span>' +
                    '   <img id="cat-img" src="' + cat.img + '" alt="Click me <3">' +
                    '</div>'

            this.catContainer.innerHTML = catsHtml

            catCounter = document.getElementById('cat-counter')
            catImg = document.getElementById('cat-img')

            catImg.addEventListener('click', function() {
                catCounter.innerHTML = ++cat.counter
            })
        }
    }

    window.addEventListener('load', function() {
        octopus.init()
    })
})()
