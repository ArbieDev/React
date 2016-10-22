var HTTP = require('../services/httpservice');
var Reflux = require('reflux');
var Actions = require('./actions.jsx');

var IngredientStore = Reflux.createStore({
    listenables: [Actions],
    getIngredients: function() {
        HTTP.get('/ingredients')
        .then(function(json) {
            this.ingredients = json;
            this.fireUpdate();
        }.bind(this));
    },
    postIngredient: function(text) {
        if (!this.ingredients) {
            this.ingredients = [];
        }
        var ingredient = {
            "id": Math.random().toString(36).substr(2, 6),
            "text": text
        };

        this.ingredients.push(ingredient);
        this.fireUpdate();

        HTTP.post('/ingredients', ingredient)
        .then(function(response) {
            this.getIngredients();
        }.bind(this));
    },
    fireUpdate: function() {
        this.trigger('change', this.ingredients);
    }
});

module.exports = IngredientStore;
