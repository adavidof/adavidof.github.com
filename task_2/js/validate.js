var App = App || {};

(function() {
    domready(function() {
        'use strict';

        function ValidateForm(node) {
            this.node = node;

            // Time before validate element
            this.timeToCheck = 500; // ms

            // CSS CLasses
            this.elementError = 'alert-danger';
            this.elementHideClassName = 'hide';
            this.inputValidateTrue = 'inputValidateTrue';
            this.inputValidateFalse = 'inputValidateFalse';

            // Error of current node
            this.elementErrors = {};
            this.elementErrors.name = 1; // required
            this.elementErrors.surname = 1; // required
            this.elementErrors.year = 1; // required
            this.elementErrors.phone = 1; // required

            // Regular expressions
            this.textRegExp = /^[a-zа-яё]{1,20}$/i;
            this.yearRegExp = /^[0-9]{4}$/;
            this.phoneRegExp = /^\+[0-9]{10,15}$/;

            // All elements
            this.nameNode = node.querySelector('#name');
            this.surnameNode = node.querySelector('#surname');
            this.phoneNode = node.querySelector('#phone');
            this.yearNode = node.querySelector('#year');
            this.genderNode = node.querySelector('#gender');
            this.buttonNode = node.querySelector('#button');
            this.buttonNode.disabled = true; // IE9

            this.init();
        }

        ValidateForm.prototype.validateText = function(node, errorEl) {
            setTimeout(function() {
                if (this.textRegExp.test(node.value) !== true) {
                    this.elementHasError(node, errorEl);
                } else { // Well done all tests
                    this.elementHasError(node, errorEl, false);
                }
            }.bind(this), this.timeToCheck);
        };

        ValidateForm.prototype.validateYear = function(node, errorEl) {
            setTimeout(function() {
                if (node.value.length === 0 || this.yearRegExp.test(node.value) !== true) {
                    this.elementHasError(node, errorEl);
                } else { // Well done all tests
                    this.elementHasError(node, errorEl, false);
                }
            }.bind(this), this.timeToCheck);
        };

        ValidateForm.prototype.validatePhone = function(node, errorEl) {
            setTimeout(function() {
                if (node.value.length === 0 || this.phoneRegExp.test(node.value) !== true) {
                    this.elementHasError(node, errorEl);
                } else { // Well done all tests
                    this.elementHasError(node, errorEl, false);
                }
            }.bind(this), this.timeToCheck);
        };

        ValidateForm.prototype.enableButton = function(node) {
            var allErrors = 0;
            for (var prop in this.elementErrors) {
                allErrors += this.elementErrors[prop];
            }

            if (allErrors === 0) {
                TBclassNameToggle(node, 'disabled', false);
                node.disabled = false;
            } else {
                TBclassNameToggle(node, 'disabled', true);
                node.disabled = true;
            }
        };

        ValidateForm.prototype.onclickButton = function(event) {
            // Send JSON
            var dataObj = {
                name: this.nameNode.value,
                surname: this.surnameNode.value,
                gender: this.genderNode.value,
                year: this.yearNode.value,
                phone: this.phoneNode.value
            };
            var jsonToSend = JSON.stringify(dataObj);

            // For demonstration
            var resultDiv = document.createElement('div');
            resultDiv.style.width = '60%';
            resultDiv.style.margin = '0 auto';
            resultDiv.innerHTML =
                '<p style="font-weight: bold;">JSON:</p>' + '<p>' + jsonToSend + '</p>' + '<hr>';
            document.body.appendChild(resultDiv);

            TBeventDefault(event);
        };

        ValidateForm.prototype.elementHasError = function(node, elementName, errorContent) {
            var errorElement = node.parentNode.getElementsByClassName(this.elementError)[0]; // take alert div
            this.elementErrors[elementName] = 1; // default error value
            if (errorContent === false) { // we dont have errors
                this.elementErrors[elementName] = 0;
                TBclassNameToggle(errorElement, this.elementHideClassName, true);
                TBclassNameToggle(node, this.inputValidateTrue, true); // addClass inputValidateTrue
                TBclassNameToggle(node, this.inputValidateFalse, false); // removeClass inputValidateFalse
            } else {
                TBclassNameToggle(errorElement, this.elementHideClassName, false);
                TBclassNameToggle(node, this.inputValidateTrue, false);
                TBclassNameToggle(node, this.inputValidateFalse, true);
            }
            this.enableButton.bind(this, this.buttonNode)();
        };

        ValidateForm.prototype.init = function() {
            // All addEventListeners
            TBaddEventListener(this.nameNode, 'keyup', this.validateText.bind(this, this.nameNode, 'name'));
            TBaddEventListener(this.nameNode, 'blur', this.validateText.bind(this, this.nameNode, 'name'));

            TBaddEventListener(this.surnameNode, 'keyup', this.validateText.bind(this, this.surnameNode, 'surname'));
            TBaddEventListener(this.surnameNode, 'blur', this.validateText.bind(this, this.surnameNode, 'surname'));

            TBaddEventListener(this.yearNode, 'keyup', this.validateYear.bind(this, this.yearNode, 'year'));
            TBaddEventListener(this.yearNode, 'blur', this.validateYear.bind(this, this.yearNode, 'year'));

            TBaddEventListener(this.phoneNode, 'keyup', this.validatePhone.bind(this, this.phoneNode, 'phone'));
            TBaddEventListener(this.phoneNode, 'blur', this.validatePhone.bind(this, this.phoneNode, 'phone'));

            TBaddEventListener(this.buttonNode, 'click', this.onclickButton.bind(this));
        };

        App.ValidateForm = ValidateForm;
    });
})();