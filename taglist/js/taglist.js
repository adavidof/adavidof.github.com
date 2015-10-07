$(function() {
    'use strict';

    function TagList(node, tagsArray) {
        if (!node) {
            console.log('No `node` argument');
            return;
        }
        this.$node = $(node).eq(0);
        this.tagsArray = tagsArray || [];

        this.init();
    }

    TagList.prototype.init = function() {
        var _this = this;

        // text
        this.textDisplay = 'Edit tags';
        this.textEdit = 'Close edit panel';
        this.textNewTag = 'New tag';
        this.textNewTagButtonText = 'Add tag';

        // class names
        this.listTagsDeleteTagClassName = 'hide';

        // construct Html
        this.$node.append(this.constructHTML());

        // nodes
        this.$listTagsHeadNode = this.$node.find('.tag-list-head').eq(0);
        this.$listTagsNode = this.$node.find('.tag-list-tags').eq(0);
        this.$listTagsAddNode = this.$node.find('.tag-list-tags-add').eq(0);

        // selectorName
        this.listTagsDeleteTagSpanSelector = 'div > div';
        this.buttonGroupSelector = 'btn-group';

        // value of input
        this.$tagText = this.$listTagsAddNode.find('input.form-control').eq(0);

        // click to open/close add tags panel
        this.$listTagsHeadNode.find('a').click(function() {
            _this.togglePanelTags(this, _this.$listTagsAddNode, _this.listTagsDeleteTagSpanSelector);
        });

        // click to add tag
        this.$listTagsAddNode.find('button').click(function() {
            _this.tagAdd(_this.$tagText);
        });

        // press enter to add tag
        this.$listTagsAddNode.find('input.form-control').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.tagAdd(_this.$tagText);
                e.preventDefault();
            }
        });

        // delegate click to delete tag
        this.$listTagsNode.click(function(e) {
            var $target = $(e.target);

            if ($target.hasClass('tag-list-tags-delete')) {
                var targetValue = $target.prev().get(0).textContent;

                // remove tag element from html
                $target.parent().remove();

                // remove tag from tagsArray
                var index = _this.tagsArray.indexOf(targetValue);
                if (index > -1) {
                    _this.tagsArray.splice(index, 1);
                }
            }
        });
    };

    TagList.prototype.constructHTML = function() {
        var tagsArrayHtml = '';
        // if tagsArray have some tags we add tags to Html
        if (this.tagsArray.length > 0) {
            for (var i = 0; i < this.tagsArray.length; i += 1) {
                tagsArrayHtml += this.tagToHtml(this.tagsArray[i]);
            };
        }

        var $mainNode = $(
            '<div class="tag-list-head col-xs-12 text-left">' +
                '<a class="btn btn-link">' + this.textDisplay + '</a>' +
            '</div>' +
            '<div class="tag-list-tags col-xs-12">' +
            tagsArrayHtml +
            '</div>' +
            '<div class="tag-list-tags-add col-xs-12 col-sm-10 col-md-8 col-lg-6">' +
                '<div class="input-wrapper col-xs-12 col-sm-10">' +
                    '<input class="form-control" placeholder="' + this.textNewTag + '">' +
                '</div>' +
                '<div class="button-wrapper col-xs-12 col-sm-2">' +
                    '<button class="btn btn-default btn-block">' + this.textNewTagButtonText + '</button>' +
                '</div>' +
            '</div>' +
            '<div class="col-xs-12"></div>');
        return $mainNode;
    }

    // take tag in html code
    // if option === true - element visible, else - hide
    TagList.prototype.tagToHtml = function(tag, option) {
        // create Html
        var $tagHtml = $(
            '<div class="' + ((option) ? ' ' + this.buttonGroupSelector : '') + '">' +
                '<button class="btn btn-sample btn-xs disabled"></button>' +
                '<div class="btn btn-sample btn-xs tag-list-tags-delete' + ((!option) ? ' ' + this.listTagsDeleteTagClassName : '') + '">X</div>' +
            '</div>');
        // add tag to Html and escape html special charses
        $tagHtml.find('button:first').text(tag);
        // return outerHTML becose we need all Html, not only inner
        return $tagHtml.get(0).outerHTML;
    }

    TagList.prototype.togglePanelTags = function(clickElement, node, tagDeleteButtonElement) {
        var _this = this;
        // toggle text of head and show/hide of add tag panel
        node.toggle(0, function() {
            clickElement.textContent = (clickElement.textContent === _this.textEdit) ? _this.textDisplay : _this.textEdit;
        });
        // toggle class to show/hide delete buttons
        this.$listTagsNode.find(tagDeleteButtonElement).toggleClass(this.listTagsDeleteTagClassName);
        // toogle class to group or not group buttons of tag and delete
        this.$listTagsNode.find('> div').toggleClass(this.buttonGroupSelector);
    }

    // check errors in tag name and check if array of tags already have new tag
    TagList.prototype.ifTagCorrect = function(tagText) {
        tagText = tagText.trim();
        return this.tagsArray.indexOf(tagText) === -1 && tagText;
    }

    // escape tag of html specialchars, and after add tag to html + to array
    TagList.prototype.tagAppendToHtml = function(tagText) {
        this.$listTagsNode.append(this.tagToHtml(tagText, true));
    }

    // tag add method, whats add $tagValue to array and to html
    TagList.prototype.tagAdd = function($tagValue) {
        var valueCheckedText = this.ifTagCorrect($tagValue.val());
        if (valueCheckedText) {
            // push tagName to tagsArray
            this.tagsArray.push(valueCheckedText);
            // append tag to html
            this.tagAppendToHtml(valueCheckedText);
            // clear input value
            this.$tagText.val('');
            this.$tagText.removeClass('tag-wrong-input');
        } else {
            this.$tagText.addClass('tag-wrong-input');
        }
    }

    // set TagList on global scope
    window.TagList = TagList;
});