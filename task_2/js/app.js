var App = App || {};

(function() {
    domready(function() {
        'use strict';

        var myFormNode = document.getElementsByClassName('myForm')[0];
        App.validateForm = new App.ValidateForm(myFormNode);
    });
})();