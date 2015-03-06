$(function() {
	// 'use strict';

	var app = app || {};

	var ModelClass = Backbone.Model.extend({});

	app.Model = new ModelClass({
		defaults: {
			'node': $('div.container').eq(0),
			'title': 'Форма сбора данных для регистрации',
			'usedEmails': ['author@mail.com', 'foo@mail.com', 'tester@mail.com'],
			'inputHolderText': 'Введите значение',
			'timeToCheck': 500,
			'emailRegularExpression': /^([a-z0-9]+(([._-]{1}[a-z0-9]+)|()))+@(([a-z0-9]+[-_]{0,1}[a-z0-9]+[a-z0-9.]{0,1})|([a-z0-9]+[.]{1}))+[a-z0-9]+$/i
		}


	});





	var ViewClass = Backbone.View.extend({
		model: app.Model,


		el: app.Model.get('defaults').node,

		initialize: function() {
			// eq(0) on selector *:first ??
			var formHeader = this.$el.find('h1:first');
			formHeader.html(this.model.get('defaults').title);
		},

		render: function() {

			


			var inputNode = $('.input-box').eq(0);


			inputNode.val(this.model.get('defaults').inputHolderText);

		},


		events: {
			'keyup': 'inputChangeValue',
			'change': 'inputChangeValue',
			'blur': 'inputChangeValue',
			'focus': 'clearInput',
			'click': 'clearInput',
			'focusout': 'fillInput'
		},


		inputChangeValue: function() {
			console.log('Input changed value');
		},
		clearInput: function() {
			this.$el.val('');
		},
		fillInput: function() {
			this.$el.val(this.model.get('defaults').inputHolderText);
		}
	});

	app.View = new ViewClass({});
	app.View.render();

});