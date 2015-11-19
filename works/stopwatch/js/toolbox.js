'use strict';
// My ToolBox with cross-browser functions

// event.preventDefault()
function TBeventDefault(event) {
    var event = event || window.event;
    if (event.preventDefault) {
        event.preventDefault();
    } else { // IE<9
        event.returnValue = false;
    }
}

// event.target
function TBeventTarget(event) {
    var event = event || window.event; // IE
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