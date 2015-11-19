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
    }
});