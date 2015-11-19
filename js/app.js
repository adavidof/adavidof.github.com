'use strict';

var app = app || {};

$(function() {

    app.config.works = _.sortBy(app.config.works, function(el) {
        return -el.id;
    });

    app.works = new app.Works();


    app.MainView = Backbone.View.extend({
        el: $('.row-content'),

        initialize: function() {
            this.listenTo(this.collection, "change reset add remove", this.render);
        },

        render: function() {
            var self = this;
            this.collection.each(function(model) {
                var work = new app.WorkView({
                    model: model.toJSON()
                });

                self.$el.append(work.render());
            });
            return this;
        }
    });

    app.mainView = new app.MainView({
        collection: app.works
    });

    app.works.reset(app.config.works);
});