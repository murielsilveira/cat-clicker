'use strict';

(function(){

    var model = {
        currentCat: null,
        init: function() {
            this.cats = [
                {name: 'Smally Cat', img: 'img/smally-cat.jpg', counter: 0},
                {name: 'Stair Cat', img: 'img/stair-cat.jpg', counter: 0},
                {name: 'Sleepy Cat', img: 'img/sleepy-cat.jpg', counter: 0},
                {name: 'Zuero Cat', img: 'img/zuero-cat.jpg', counter: 0},
            ].sort(this._catOrderCompare)
        },
        getAllCats: function() {
            return this.cats.sort(model._catOrderCompare)
        },
        getCat: function(index) {
            return this.cats[index]
        },
        saveCat: function(index, name, imgUrl, numClicks) {
            this.cats[index] = {
                name: name,
                img: imgUrl,
                counter: numClicks
            }
        },
        _catOrderCompare: function(a, b) {
            return a.name.toLowerCase() > b.name.toLowerCase()
        }
    },

    octopus = {
        init: function() {
            model.init()
            this.currentCatIndex = 0
            catListView.init()
            catView.init()
            catAdminView.init()
        },
        getAllCats: function() {
            return model.getAllCats()
        },
        getCurrentCat: function() {
            return model.getCat(this.currentCatIndex)
        },
        setCurrentCat: function(index) {
            this.currentCatIndex = index
            catAdminView.closeAdmin()
            catView.render()
        },
        saveCat: function(name, imgUrl, numClicks) {
            model.saveCat(this.currentCatIndex, name, imgUrl, numClicks)
            catAdminView.closeAdmin()
            catListView.render()
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
            self.listContainer.innerHTML = ''
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
                    '<span id="cat-name">' + cat.name + ' - </span>' +
                    '<span id="cat-counter">' + cat.counter + '</span>' +
                    '<img id="cat-img" src="' + cat.img + '" alt="Click me <3">'

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
    },

    catAdminView = {
        init: function() {
            this.adminContainer = document.getElementById('cat-admin')
            this.isOpen = false
            this.render()
        },
        render: function() {
            this.adminContainer.innerHTML = '<button id="btn-admin">Admin</button>'

            document.getElementById('btn-admin')
                .addEventListener('click', this.openAdmin.bind(this))
        },
        openAdmin: function() {
            if (this.isOpen) return
            
            var cat = octopus.getCurrentCat()
            var form = document.createElement('form')
            form.id = 'form-admin'
            form.innerHTML = '<label for="name">Name</label>' +
                             '<input name="name" value="' + cat.name + '"/>' +
                             '<label for="url">URL</label>' +
                             '<input name="url" value="' + cat.img + '"/>' +
                             '<label for="clicks">#Clicks</label>' +
                             '<input name="clicks" value="' + cat.counter + '"/>' +
                             '<div class="admin-actions">' +
                             '<button id="btn-cancel" type="button">Cancel</button>' +
                             '<button id="btn-save" type="button">Save</button>' +
                             '</div>'
            this.adminContainer.appendChild(form)
            this.isOpen = true

            document.getElementById('btn-admin').style.display = 'none'

            document.getElementById('btn-cancel')
                .addEventListener('click', this.closeAdmin.bind(this))
            document.getElementById('btn-save')
                .addEventListener('click', this.saveCat.bind(this))
        },
        closeAdmin: function() {
            if (!this.isOpen) return
            
            this.isOpen = false
            document.getElementById('btn-admin').style.display = 'block'
            document.getElementById('form-admin').remove()
        },
        saveCat: function() {
            if (!this.isOpen) return

            var elements = document.getElementById('form-admin').elements
            octopus.saveCat(elements.namedItem('name').value,
                            elements.namedItem('url').value,
                            elements.namedItem('clicks').value)
        }
    }

    window.addEventListener('load', function() {
        octopus.init()
    })
})()
