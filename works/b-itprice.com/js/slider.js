$(function() {
    'use strict';

    function Slider(customOptions) {
        var options = {
            timeSlide: 2000,
            timeSlideAfterClick: 5000,
            clickWhenAnimate: true
        };
        $.extend(options, customOptions);

        this.$node = $(options.mainNode).eq(0);
        this.$sidebar = $(options.sidebarNode, this.$node).eq(0);
        this.$images = $(options.imagesNode, this.$node).eq(0);
        this.timeSlide = options.timeSlide;
        this.timeSlideAfterClick = options.timeSlideAfterClick;
        this.clickWhenAnimate = options.clickWhenAnimate;

        this.intervalIdSlideImages = 0;
        this.timeoutIdAfterClick = 0;
        this.imageWidth = 0;
        this.currentImageId = -1;
        this.imagesQuantity = 4;

        this.imageActiveClass = 'slider-sidebar-active';

        var $img = this.$node.find('img').eq(0);
        var _this = this;

        // Fix IE9 image onload bug
        // http://garage.socialisten.at/2013/06/how-to-fix-the-ie9-image-onload-bug/
        $img.attr("src", $img.attr("src"));
        $img.load(function() {
            _this.imageWidth = $(this).width();
            _this.init();
        });
    }

    Slider.prototype.Slide = function() {
        var _this = this;
        if (this.currentImageId !== -1) {
            this.$images.animate({
                'marginLeft': '-' + (this.imageWidth * this.currentImageId) + 'px'
            }, _this.timeSlide / 2);

            this.timeoutIdAfterClick = setTimeout(function() {
                _this.AnimateSlide();
            }, this.timeSlideAfterClick - this.timeSlide);
        } else {// The first exec of application
            this.currentImageId = 0;
            this.AnimateSlide();
        }
    }

    Slider.prototype.AnimateSlide = function() {
        var _this = this;
        this.intervalIdSlideImages = setInterval(function() {
            _this.currentImageId = (_this.currentImageId < _this.imagesQuantity - 1) ? _this.currentImageId + 1 : 0;
            _this.ActiveImageAddClass();

            var marginLeftSlidePx = _this.currentImageId * _this.imageWidth;

            _this.$images.animate({
                'marginLeft': '-' + marginLeftSlidePx + 'px'
            }, _this.timeSlide - _this.timeSlide / _this.imagesQuantity);
        }, _this.timeSlide);
    }

    Slider.prototype.ActiveImageAddClass = function() {
        this.$sidebar.find('div').removeClass(this.imageActiveClass);
        this.$sidebar.find('div:eq(' + this.currentImageId + ')').addClass(this.imageActiveClass);
    }

    Slider.prototype.init = function() {
        var _this = this;
        this.Slide();
        this.$sidebar.find('div').click(function() {
            if (_this.clickWhenAnimate === true) {
                // When slide is animating(in process) we can't animate to another slide
                if (_this.$images.is(':animated') === true) {
                    return;
                }
            }
            if ($(this).index() === _this.currentImageId) {
                return;
            }
            
            // Stop animation && clear interval & timer
            _this.$images.stop(true);
            clearInterval(_this.intervalIdSlideImages);
            clearTimeout(_this.timeoutIdAfterClick);

            _this.currentImageId = $(this).index(); // Save current id of image
            _this.ActiveImageAddClass(); // Change active tab on left-plank(sidebar)
            _this.Slide(); // Exec the method Slide, start slide the images
        });
    }

    window.Slider = Slider;
});