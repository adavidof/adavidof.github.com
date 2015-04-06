$(function() {
	'use strict';
	function MakeZoomable(node) {
		this.$node = $(node);
		this.imageOuterIndent = 0.05; // 0.01 === 1%, how many % we have in margin(outer indent) from browser border
		this.$popupOuter;
		this.$wrapper;

		this.init();
	}

	MakeZoomable.prototype.init = function() {
		// When we have 2 or more MakeZoomable we don't need create and append new element div.popup-outer
		if ($(document).find('.popup-outer').length === 0) {
			// I use createElement cose it's really fastest
			// http://jsperf.com/jquery-vs-createelement
			// http://stackoverflow.com/questions/268490/jquery-document-createelement-equivalent
			var popupOuter = document.createElement('div');
			$(popupOuter).addClass('popup-outer');
			$('body').append(popupOuter);
		}
		this.$popupOuter = $('.popup-outer');

		// Use declaration we add click event on all images
		var _this = this;
		this.$node.click(function(e) {
			var $img = $(e.target);
			if ($img[0].nodeName === 'IMG') {
				var imgLargeSizeSrc = $img[0].src.replace('small', 'large');

				_this.loadImageAndConstructWrapper(imgLargeSizeSrc);
				_this.$popupOuter.fadeTo(0, 0.7);
			}
		})
	};

	// Load the image and construct wrapper
	MakeZoomable.prototype.loadImageAndConstructWrapper = function(url) {
		var $img = $('<img src="' + url + '">');

		var _this = this;
		$img.on('load', function() {
			// Put max-width and max-height into $wrapper
			_this.$wrapper.css({
				'max-width': this.naturalWidth,
				'max-height': this.naturalHeight
			});

			// Get correct size for resize the image
			var SizeCorrectedOnImageLoad = _this.getSizeAndPositionCoordinates(this.naturalWidth, this.naturalHeight);

			// Set css with object that contains: top, left, width, height properties
			_this.$wrapper.css(SizeCorrectedOnImageLoad);

			// Change size on window resize event
			var $imgThis = this;
			$(window).resize(function() {
				var SizeCorrectedOnWindowResize = _this.getSizeAndPositionCoordinates($imgThis.naturalWidth, $imgThis.naturalHeight);
				_this.$wrapper.css(SizeCorrectedOnWindowResize);
			});
		});

		// addEventListener for keyup
		$(document).one('keyup', function(e) {
			if (e.keyCode === 27) {
				_this.hideImage();
			}
		});

		// We dont destroy the images. We hide and when we want we can show them.
		// For append only 1 img-wrapper, we need check if we already have image with our url
		var searchImgWrapper = $('.img-wrapper > img[src*="' + url + '"]');
		if (searchImgWrapper.length < 1) {
			this.$wrapper = $(document.createElement('div'));

			var hideImageEl = document.createElement('img');
			hideImageEl.src = './img/close.png';
			var hideImageWrapper = $(document.createElement('a'));
			hideImageWrapper.attr('href', '#');
			hideImageWrapper.addClass('close-image-wrapper');
			hideImageWrapper.append(hideImageEl);

			// Click to hide image
			hideImageWrapper.click(function(e) {
				_this.hideImage();
				e.preventDefault();
			});

			this.$wrapper.append($img, hideImageWrapper);
			this.$wrapper.addClass('img-wrapper');

			$('body').append(this.$wrapper);
		} else {
			// If we already have 1 wrapper
			this.$wrapper = searchImgWrapper.parent();
			this.$wrapper.show();
			this.$popupOuter.show();
		}
		$img.show();
	}

	// Get top and left coordinates to center the wrapper with image
	MakeZoomable.prototype.getSizeAndPositionCoordinates = function(width, height) {
		var ratio = width / height;
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
		var newWidth = width;
		var newHeight = height;
		
		if (newWidth * (1 + this.imageOuterIndent) > windowWidth) {
			newWidth = newWidth * (1 - this.imageOuterIndent) - (newWidth - windowWidth);
			newHeight = newWidth / ratio;
		}
		if (newHeight * (1 + this.imageOuterIndent) > windowHeight) {
			newHeight = height * (1 - this.imageOuterIndent) - (height - windowHeight);
			newWidth = newHeight * ratio;
		}

		var positionTop = windowHeight / 2 - newHeight / 2;
		var positionLeft = windowWidth / 2 - newWidth / 2;

		// Return object with position and size properties
		return {
			'top': positionTop,
			'left': positionLeft,
			'width': newWidth,
			'height': newHeight
		};
	}

	// Hide image
	MakeZoomable.prototype.hideImage = function() {
		this.$popupOuter.hide();
		this.$wrapper.hide();
	}

	var zoomableImage1 = new MakeZoomable(document.querySelector('.gallery-1'));
	var zoomableImage2 = new MakeZoomable(document.querySelector('.gallery-2'));
});