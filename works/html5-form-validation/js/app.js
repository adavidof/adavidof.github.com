/*
 * Simple html5 form validation
 * Use only native JS
 */

'use strict';

(function() {
    var button = document.getElementsByClassName('send-data')[0];

    button.addEventListener('click', function(ev) {
        var form = document.getElementsByClassName('main-form')[0];
        var allInputs = form.getElementsByTagName('input');

        var inputName = findElWithId('InputName', allInputs);
        var inputLastname = findElWithId('InputLastname', allInputs);
        var inputSex = findRadioChecked('optionsRadios');
        var inputBirthday = findElWithId('InputBirthday', allInputs);
        var inputTelephone = findElWithId('InputTelephone', allInputs);

        var formIsValid = [inputName, inputLastname, inputSex, inputBirthday, inputTelephone].every(function(el) {
            return el.validity.valid === true;
        });

        if (formIsValid) {
            ev.preventDefault();

            var resJSON = JSON.stringify({
                name: inputName.value,
                lastname: inputLastname.value,
                sex: inputSex.value,
                birthday: inputBirthday.value,
                telephone: inputTelephone.value
            });

            console.log(resJSON);
        } else {
            console.log('Form is not a valid!');
        }
    }, false);

    function findElWithId(elId, htmlCollection) {
        return [].find.call(htmlCollection, function(el) {
            return el.id === elId;
        });
    }

    function findRadioChecked(radioGroupName) {
        return [].find.call(document.getElementsByName(radioGroupName), function(el) {
            return el.checked === true;
        });
    }
}());