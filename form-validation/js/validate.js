(function() {
    'use strict';

    // Global array of used emails
    var usedEmails = ['author@mail.com', 'foo@mail.com', 'tester@mail.com'];

    function ValidateForm(formNode) {
        this.node = formNode;

        // Time before validate element
        this.timeToCheck = 500; // ms

        // Regular expressions
        this.emailRegExp = /^([a-z0-9]+(([._-]{1}[a-z0-9]+)|()))+@(([a-z0-9]+[-_]{0,1}[a-z0-9]+[a-z0-9.]{0,1})|([a-z0-9]+[.]{1}))+[a-z0-9]+$/i;
        this.passwordSimpleRegExp = /^[a-z0-9]+$/i;
        this.passwordRegExp = /^[a-z0-9_-]+$/i;
        this.phoneRegExp = /^\+[0-9]{10,15}$/;

        // All nodes
        this.emailNode = this.node.querySelector('#email');
        this.passwordNode = this.node.querySelector('#password');
        this.phoneNode = this.node.querySelector('#phone');
        this.checkboxNode = this.node.querySelector('#checkbox');
        this.buttonNode = this.node.querySelector('#button');
        this.buttonNode.disabled = true; // IE9

        this.init();
    }

    ValidateForm.prototype.validateEmail = function(node) {
        /*
        email test on this.emailRegExp:
            validate true
                a_a@y.r
                x@y.z
                ah6y@i-dasd.asd-dasd.123dasd-da1.da
                hello-hello_231-31.3@i.ua
                google.com@mail.ru
                ah6y@i.s-s.ua
                ah6y@i-dasd.asd-dasd.123dasd-da1.da
                aH6y@i-a.ua
                6666_sssaH6y@i.ua

            validate false
                x-@y.r
                ah6y@i--da.d-da1.da
                aH6y@_i.ua
                aH6y@i----.ua
                aH6y@i_.ua
                aH6y@i._ua
                6(da@y.r
                6(da_@y.r
                .66.66@x.x
        */
        var elementErrorName = 'email';
        this.setTimeout(function() {
            if (this.emailRegExp.test(node.value) !== true) {
                this.elementHasError(node, 'Введите корректный e-mail, вида user@mail.com', elementErrorName);
            } else if (usedEmails.indexOf(node.value) !== -1) {
                this.elementHasError(node, 'Такой e-mail уже зарегистрирован, введите другой e-mail.', elementErrorName);
            } else { // Well done all tests
                this.elementHasError(node, false, elementErrorName);
            }
        }.bind(this), this.timeToCheck);
    }

    ValidateForm.prototype.validatePassword = function(node) {
        var elementErrorName = 'password';
        this.setTimeout(function() {
            if (node.value.length < 6 || node.value.length > 20) {
                this.elementHasError(node, 'Длина пароля – 6-20 символов.', elementErrorName);
            } else if (this.passwordSimpleRegExp.test(node.value) === true) {
                this.elementHasError(node, 'Пароль слишком простой, используйте подчеркивание и минус.', elementErrorName);
            } else if (this.passwordRegExp.test(node.value) !== true) {
                this.elementHasError(node, 'Пароль содержит запрещенные символы (разрешенные - латинские буквы, цифры, подчеркивание, минус)', elementErrorName);
            } else { // Well done all tests
                this.elementHasError(node, false, elementErrorName);
            }
        }.bind(this), this.timeToCheck);
    }

    ValidateForm.prototype.validatePhone = function(node) {
        var elementErrorName = 'phone';
        this.setTimeout(function() {
            if (node.value.length === 0) {
                this.elementHasError(node, false, elementErrorName);
            } else if (this.phoneRegExp.test(node.value) !== true) {
                this.elementHasError(node, 'Международный формат записи телефона не выдержан. Номер вводить необязательно, либо вводите номер в правильном формате, либо не вводите. Правильный формат: +380271234567', elementErrorName);
            } else { // Well done all tests
                this.elementHasError(node, false, elementErrorName);
            }
        }.bind(this), this.timeToCheck);
    }

    ValidateForm.prototype.onclickCheckbox = function(node) {
        if (node.checked === true) {
            this.elementErrors.checkbox = 0;
        } else {
            this.elementErrors.checkbox = 1;
        }
        this.enableButton.bind(this, this.buttonNode)();
    }

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
    }

    ValidateForm.prototype.onclickButton = function(event) {
        // We can see our results in browser console
        console.log('Information:');
        console.log('E-mail: ' + this.emailNode.value);
        console.log('Password: ' + this.passwordNode.value);
        if (this.phoneNode.value.length !== 0) {
            console.log('Phone: ' + this.phoneNode.value);
        }
        console.log('');

        // Also we can see results on page
        // For demonstration of work
        var resultDiv = document.createElement('div');
        resultDiv.style.width = '60%';
        resultDiv.style.margin = '0 auto';
        resultDiv.innerHTML = 
        '<p style="font-weight: bold;">Information(Just for demonstration of work):</p>'
        + '<p>E-mail: ' + this.emailNode.value + '</p>'
        + '<p>Password: ' + this.passwordNode.value + '</p>'
        + ((this.phoneNode.value.length !== 0) ? '<p>Phone: ' + this.phoneNode.value + '</p>' : '')
        + '<hr><br>';
        document.body.appendChild(resultDiv);

        TBeventDefault(event);
    }

    ValidateForm.prototype.elementHasError = function(node, errorContent, elementName) {
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
            errorElement.textContent = errorContent;
        }
        this.enableButton.bind(this, this.buttonNode)();
    }

    ValidateForm.prototype.init = function() {
        // CSS CLasses
        this.elementError = 'alert-danger';
        this.elementHideClassName = 'hide';
        this.inputValidateTrue = 'inputValidateTrue';
        this.inputValidateFalse = 'inputValidateFalse';

        // Error of current node
        this.elementErrors = {};
        this.elementErrors.email = 1; // required
        this.elementErrors.password = 1; // required
        this.elementErrors.phone = 0; // Cose phone input not required
        this.elementErrors.checkbox = 1; // required

        // All addEventListeners
        TBaddEventListener(this.emailNode, 'keyup', this.validateEmail.bind(this, this.emailNode));
        TBaddEventListener(this.emailNode, 'blur', this.validateEmail.bind(this, this.emailNode));

        TBaddEventListener(this.passwordNode, 'keyup', this.validatePassword.bind(this, this.passwordNode));
        TBaddEventListener(this.passwordNode, 'blur', this.validatePassword.bind(this, this.passwordNode));

        TBaddEventListener(this.phoneNode, 'keyup', this.validatePhone.bind(this, this.phoneNode));
        TBaddEventListener(this.phoneNode, 'blur', this.validatePhone.bind(this, this.phoneNode));

        TBaddEventListener(this.checkboxNode, 'click', this.onclickCheckbox.bind(this, this.checkboxNode));
        TBaddEventListener(this.buttonNode, 'click', this.onclickButton.bind(this));
    }

    ValidateForm.prototype.setTimeout = function(func, time) {
        setTimeout(func, time);
    }

    window.ValidateForm = ValidateForm;
}())