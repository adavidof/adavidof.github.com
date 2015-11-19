$(function() {
	'use strict';

	/* Toggle form */
	var $headerLoginLink = $('.header-login-link').eq(0);
	var $loginForm = $('.header-login-form').eq(0);

	$headerLoginLink.click(function(e) {
		$loginForm.toggle();
		e.preventDefault();
	});

	var slider = new Slider({
		mainNode: '.slider-node',
		sidebarNode: '.slider-sidebar',
        imagesNode: '.slider-images-inner',
		clickWhenAnimate: false,
		timeSlide: 4000,
        timeSlideAfterClick: 5000
	});
});