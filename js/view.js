'use strict';

var app = app || {};
$(function() {
    app.WorkView = Backbone.View.extend({
        template: _.template($('#work-template').html()),

        render: function() {
            return this.template(this.model);
        }
    });
});