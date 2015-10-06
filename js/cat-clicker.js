'use strict';

(function(){

    var model = {
        currentCat: null,
        init: function() {
            this.cats = [
                {name: 'Smally Cat', img: 'img/smally-cat.jpg', counter: 0},
                {name: 'Stair Cat', img: 'img/stair-cat.jpg', counter: 0},
                {name: 'Sleepy Cat', img: 'img/sleepy-cat.jpg', counter: 0},
                {name: 'Doido Cat', img: 'img/doido-cat.jpg', counter: 0},
            ].sort(this._catOrderCompare)
        },
        getAllCats: function() {
            return this.cats.sort(model._catOrderCompare)
        },
        getCat: function(index) {
            return this.cats[index]
        },
        getCurrentCat: function() {
            return this.currentCat
        },
        _catOrderCompare: function(a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase()
        }
    },

    octopus = {
        init: function() {
            model.init()
            model.currentCat = model.getCat(0)
            catListView.init()
            catView.init()
        },
        getAllCats: function() {
            return model.getAllCats()
        },
        getCurrentCat: function() {
            return model.currentCat
        },
        setCurrentCat: function(index) {
            model.currentCat = model.getCat(index)
            catView.render()
        }
    },

    catListView = {
        init: function() {
            this.listContainer = document.getElementById('list-container')
            this.render()
        },
        render: function() {
            var cats = octopus.getAllCats(),
                self = this
            cats.forEach(function(cat, index) {
                var item = document.createElement('li')
                item.innerHTML = cat.name
                item.classList.add('list-item')
                item.setAttribute('data-index', index)
                item.addEventListener('click', self.showCatEvent)
                self.listContainer.appendChild(item)
            })
        },
        showCatEvent: function(event) {
            var index = parseInt(event.target.getAttribute('data-index'))
            octopus.setCurrentCat(index)
        }
    },

    catView = {
        init: function() {
            this.catContainer = document.getElementById('cat-container')
            this.render()
        },
        render: function() {
            var cat = octopus.getCurrentCat(),
                catsHtml,
                catCounter,
                catImg

            if (cat) {
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
            } else {
                this.catContainer.innerHTML = ''
            }
        }
    }

    window.addEventListener('load', function() {
        octopus.init()
    })
})()
