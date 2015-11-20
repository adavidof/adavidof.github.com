'use strict';

var app = app || {};

app.WorkModel = Backbone.Model.extend({
    defaults: {
        imagePath: './img/slider.png',
        title: 'Title',
        link: '',
        linkGitHub: '',
        linkPSD: '',
        description: 'Description'
    },
    initialize: function() {
        var alias = this.get('alias');

        this.set('imagePath', './img/' + alias + '.png');
        if (!this.get('link')) {
            this.set('link', './works/' + alias + '/index.html');
        }
        if (this.get('gitHub') !== false) {
            this.set('linkGitHub', 'https://github.com/adavidof/adavidof.github.com/tree/master/works/' + alias);
        }
    }
});