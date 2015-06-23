(function() {
    domready(function() {
        'use strict';
        var linkElement = document.getElementsByClassName('showHideLink')[0],
            appDescriptionElement = document.getElementsByClassName('app-description')[0],
            statusLink = ['Показать', 'Скрыть'];

        linkElement.addEventListener('click', function(e) {
            linkElement.children[0].innerHTML = (linkElement.children[0].innerHTML === statusLink[0]) ? statusLink[1] : statusLink[0];
            TBclassNameToggle(appDescriptionElement, 'hide');
            TBeventDefault(e);
        }, false);
    });
}());