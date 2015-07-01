$(function() {
    'use strict';

    var EVENTS = [{
        eventId: 1,
        eventName: 'Вечеринка - Radioactive',
        eventDate: '19-07-2015',
        eventTime: '21:00',
        eventDescription: 'Будет жарко!'
    }, {
        eventId: 2,
        eventName: 'Ночной беглец',
        eventDate: '10-07-2015',
        eventTime: '17:00',
        eventDescription: 'Фильм, обязательно посмотреть!'
    }, {
        eventId: 3,
        eventName: 'Like GAGA - День Рождения королевы эпатажа',
        eventDate: '28-07-2015',
        eventTime: '18:30',
        eventDescription: 'Не забыть купить подарок :P'
    }, {
        eventId: 4,
        eventName: 'Ужин с родителями',
        eventDate: '15-08-2015',
        eventTime: '20:15',
        eventDescription: 'Купить рубашку и брюки'
    }, {
        eventId: 5,
        eventName: 'Поездка за границу с любимой',
        eventDate: '30-08-2015',
        eventTime: '06:00',
        eventDescription: 'Собрать вещи, купить полотенце'
    }];


    // Sort of sections
    $('.sections-body').eq(0).sortable();

    // Sort of events
    $('.events .events-wrapper').eq(0).sortable();



    (function() {
        /* Open/close app-icon-menu */
        var $document = $(document);
        var $appIconLink = $('.app-icon .app-icon-title > a').eq(0);
        var $appIconPopup = $('.app-icon .app-icon-popup').eq(0);
        var timeToHide = 5000;

        $appIconLink.on('click', function(e) {
            $appIconPopup.toggle(100, function() {
                // Close menu on Escape click
                $document.keyup(function(e) {
                    if (e.keyCode === 27) {
                        $appIconPopup.hide(100);
                    }
                });

                // Close menu after mouseleave
                var appIconPopupTimeout;
                $appIconPopup.on('mouseleave', function() {
                    appIconPopupTimeout = setTimeout(function() {
                        $appIconPopup.slideUp(500);
                    }, timeToHide);
                });
                $appIconPopup.on('mouseenter', function() {
                    clearTimeout(appIconPopupTimeout);
                });
            });
            e.preventDefault();
        });
    })();



    (function() {
        // Append control elements (switcher button & cross)
        var $bodyRow = $('.sections-body .sections-body-row');

        var switcherOnClassName = ' sections-body-row-switcher-inner-on';
        var controlsHtml =
            '<div class="sections-body-row-control sections-body-row-switcher">' +
            '<div class="sections-body-row-switcher-outer"></div>' +
            '<div class="sections-body-row-switcher-inner${switcherClass}"></div>' +
            '</div>' +
            '<a href="#" class="sections-body-row-control sections-body-row-remove sections-body-row-state">' +
            '<div class="sections-body-row-cross"></div>' +
            '</a>';

        var resultClassName;
        for (var i = 0; i < $bodyRow.length; i += 1) {
            var $el = $bodyRow.eq(i);

            resultClassName = ($el.find('.sections-body-row-state-on').length > 0) ? switcherOnClassName : '';

            $el.append(templater(controlsHtml, {
                switcherClass: resultClassName
            }));
        }
    })();

    (function() {
        /* Switcher toggle */
        var $switchers = $('.sections-body .sections-body-row-switcher');
        $switchers.on('click', function(e) {
            var $target = $(e.target);
            var $currentRow = $target.closest('.sections-body-row').eq(0);

            // toggle state class
            $currentRow.find('.sections-body-row-state').eq(0).toggleClass('sections-body-row-state-on');

            // toggle switcher class
            $currentRow.find('.sections-body-row-switcher-inner').toggleClass('sections-body-row-switcher-inner-on');

            e.preventDefault();
        });

        /* Cross click */
        /* В целях демонстрации при нажатии на кнопке */
        var $crosses = $('.sections-body-row-remove');
        $crosses.on('click', function(e) {
            var $target = $(e.target);
            var $currentRow = $target.closest('.sections-body-row').eq(0);

            var currentRowId = parseInt(parseIdFromClassName($currentRow.attr('id')), 10);
            var currentRowTitle = $currentRow.get(0).children[1].innerHTML;

            console.log('Попытка удалить: ' + currentRowTitle);
            alert('Попытка удалить: ' + currentRowTitle);
            e.preventDefault();
        });
    })();

    (function() {
        /* Open/close events */

        var eventEditHtml =
            '<!-- Event-${eventId} -->' +
            '<div id="event-${eventId}" class="event">' +
                '<div class="event-title-outer">' +
                    '<div class="event-title-text">${eventName}</div>' +
                '</div>' +
            '<div class="event-form">' +
            '<div class="event-form-container">' +
            '<div class="event-form-main">' +
            '<!-- Event edit left part -->' +
            '<div class="left">' +
            '<div class="event-form-label margin-0">Название</div>' +
            '<div class="event-form-input">' +
            '<div class="event-form-input-wrapper event-form-input-name">' +
            '<div class="event-form-required-mark">' +
            '<div class="event-form-required-mark-inner"></div>' +
            '</div>' +
            '<input type="text" value="${eventName}">' +
            '</div>' +
            '</div>' +
            '<div class="event-form-label">Начало события</div>' +
            '<div class="event-form-time-date">' +
            '<div class="input-group date col-md-2 event-form-datepicker">' +
            '<input type="text" placeholder="00-00-0000" value="${eventDate}" class="form-control" />' +
            '<span class="input-group-addon">' +
            '<span class="glyphicon glyphicon-calendar"></span>' +
            '</span>' +
            '</div>' +
            '<div class="input-group date col-md-2 event-form-timepicker">' +
            '<input type="text" placeholder="00:00" value="${eventTime}" class="form-control" />' +
            '<span class="input-group-addon">' +
            '<span class="glyphicon glyphicon-time"></span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '<div class="event-form-label">Адрес</div>' +
            '<div class="event-form-input">' +
            '<div class="event-form-input-wrapper">' +
            '<div class="event-form-required-mark">' +
            '<div class="event-form-required-mark-inner"></div>' +
            '</div>' +
            '<input type="text" placeholder="Введите адрес контакта">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<!-- Event edit right part -->' +
            '<div class="right">' +
            '<div class="event-form-label margin-0">Картинка</div>' +
            '<div class="event-form-image-outer">' +
            '<a href="#">' +
            '<div class="event-form-image-bg">' +
            '<div class="event-form-image-outer-circle">' +
            '<div class="event-form-image-inner-circle">' +
            '<div class="event-form-image-plus"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</div>' +
            '<div class="event-form-image-help">Используйте<br>JPG, PNG, GIF</div>' +
            '<div class="clear"></div>' +
            '<div class="event-form-image-size">' +
            '<div>' +
            '<div class="event-form-label">Широта</div>' +
            '<div class="event-form-input">' +
            '<input type="text" placeholder="Широта">' +
            '</div>' +
            '</div>' +
            '<div>' +
            '<div class="event-form-label">Долгота</div>' +
            '<div class="event-form-input">' +
            '<input type="text" placeholder="Долгота">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '<div class="event-form-label">Описание</div>' +
            '<div class="event-form-textarea-container">' +
            '<div class="event-form-required-mark">' +
            '<div class="event-form-required-mark-inner"></div>' +
            '</div>' +
            '<textarea id="editor${eventId}" name="editor${eventId}" placeholder="Введите Ваше описание...">${eventDescription}</textarea>' +
            '</div>' +
            '<div class="event-form-buttons-container">' +
            '<div class="right">' +
            '<div class="content-head-button-container">' +
            '<button class="content-head-button event-form-button-cancel">Отменить</button>' +
            '</div>' +
            '<div class="content-head-button-container">' +
            '<button class="content-head-button event-form-button-save">Добавить</button>' +
            '</div>' +
            '</div>' +
            '<div class="clear"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

        var $eventsWrapper = $('.events .events-wrapper');
        for (var i = 0; i < EVENTS.length; i += 1) {
            $eventsWrapper.append(templater(eventEditHtml, EVENTS[i]));
        }
        var $events = $('.events .event');

        /* Ckeditor add to all textareas */
        setTimeout(function() {
            for (var i = 0; i < $events.length; i += 1) {
                var $currentEvent = $events.eq(i);

                var currentEventId = parseInt(parseIdFromClassName($currentEvent.attr('id')), 10);

                CKEDITOR.replace('editor' + currentEventId);
            };
        }, 1500);

        /* Open/close event */
        var $eventsLinks = $('.events .event > .event-title-outer');
        $eventsLinks.on('click', function() {
            if ($(this).next().is(':animated') === true) {
                return false;
            }
            $(this).next().toggle(500);
            $(this).parent().toggleClass('event-open');
        });

        // Datepicker
        $('div.event-form-main .event-form-datepicker').datepicker({
            format: "dd-mm-yyyy",
            language: 'ru',
            orientation: "auto",
            autoclose: true
        });

        // Timepicker
        $('div.event-form-main .event-form-timepicker').datetimepicker({
            format: 'HH:mm'
        });
    })();

    /* Help functions */
    function templater(templateString, dataObj) {
        for (var i in dataObj) {
            var tempData = '${' + i + '}';
            if (templateString.indexOf(tempData) !== -1) {
                while (templateString.indexOf(tempData) !== -1) {
                    templateString = templateString.replace(tempData, dataObj[i]);
                }
            }
        }
        return templateString;
    }

    function parseIdFromClassName(rowId) {
        var arr = rowId.split('-');
        return arr[arr.length - 1];
    }
});