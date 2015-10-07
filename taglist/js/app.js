$(function() {
    'use strict';

    var tagList1 = new TagList('.taglist1', [
        'Lorem',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa quaerat quasi, corporis. Culpa et earum inventore, distinctio, quam nihil!',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque culpa debitis veniam veritatis blanditiis, dolor, nulla facilis molestiae minus, quod reiciendis distinctio mollitia temporibus corporis ea non consequatur porro corrupti.'
    ]);
    var tagList2 = new TagList('.taglist2', ['Integer', 'Float', 'Boolean', 'null', 'undefined', 'String', 'Function', 'Object', 'Array']);
    var tagList3 = new TagList('.taglist3', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});