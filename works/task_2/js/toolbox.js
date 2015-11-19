'use strict';
// My ToolBox for cross-browser compatibility

// classNameToggle, cross-browser compatibility(ie9, ff, opera, chrome), write on className
function TBclassNameToggle(el, className, option) {
    if (!el || !className) {
        console.log('TBclassNameToggle error', el, className);
        return 'TBclassNameToggle error';
    }
    var option = (option === true || option === false) ? option : 'toggle';
    var elSplitArr = el.className.split(' ');
    var spaceBefore = ' ';
    var spaceAfter = '';
    var elSplitindexOf = elSplitArr.indexOf(className);
    if (elSplitindexOf === 0) {
        spaceBefore = '';
        spaceAfter = (elSplitArr.length > 1) ? ' ' : '';
    } else {
        spaceBefore = (elSplitArr.length < 2) ? '' : ' ';
    }
    if (option === 'toggle') {
        if (elSplitindexOf !== -1) {
            el.className = el.className.replace(spaceBefore + className + spaceAfter, '');
            return 'removeClass \'' + className + '\'';
        } else {
            el.className += spaceBefore + className;
            return 'addClass \'' + className + '\'';
        }
    } else if (option === true) { // addClass
        if (elSplitindexOf === -1) {
            el.className += ' ' + className;
            return 'addClass \'' + className + '\'';
        } else {
            return 'addClass: error, class \'' + className + '\' already has';
        }
    } else if (option === false) { // removeClass
        if (elSplitindexOf === -1) {
            return 'removeClass: error, no \'' + className + '\' in ' + el;
        }
        el.className = el.className.replace(spaceBefore + className + spaceAfter, '');
        return 'removeClass \'' + className + '\'';
    } else {
        return 'TBclassNameToggle error';
    }
}

// event.preventDefault()
function TBeventDefault(event) {
    var event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else { // IE<9:
        event.returnValue = false;
    }
}

// event.target
function TBeventTarget(event) {
    var event = event || window.event;
    return event && event.target || event.srcElement;
}

// Stop bubbling
function TBstopBubling(event) {
    var event = event || window.event;
    if (event.stopPropagation) {
        event.stopPropagation();
    } else { // IE
        event.cancelBubble = true;
    }
}

// addEventListener
function TBaddEventListener(element, event, func) {
    if (!element || !event || !func)  {
        console.log('TBaddEventListener error');
        return 'TBaddEventListener error';
    }
    if (element.addEventListener) {
        element.addEventListener(event, func, false);
    } else {
        element.attachEvent('on' + event, function() {
            return(func.call(element, window.event));   
        });
    }
}

// topWalker
function topWalker(node, func, lastParent) {
    while (node && node !== lastParent) {
        if (func(node)) {
            return node;
        }
        node = node.parentNode;
    }
}