'use strict';

var app = app || {};

app.WorkModel = Backbone.Model.extend({
    defaults: {
        imagePath: './img/slider.png',
        title: 'Title',
        link: 'http://adavidof.github.com',
        linkGitHub: '',
        linkPSD: '',
        description: 'Description'
    },
    initialize: function() {
        if (this.get('link').indexOf('http://') === -1) {
            this.set('link', './works/' + this.get('link'));
        } else {
            this.set('link', this.get('link'));
        }
    }
});