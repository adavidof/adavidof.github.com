'use strict';

var app = app || {};

app.Works = Backbone.Collection.extend({
    model: app.WorkModel
});