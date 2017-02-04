// VIDEO COLOR
$(window).load(function () {
	var video = $('#video');
	if (video) {
		var menuBtn = $('#menu-toggle'),
				logo = $('#logo'),
				height = video.height() - menuBtn.outerHeight(true),
				scroll = $(window).scrollTop();

		if (scroll <= height){
			logo.addClass('home_button--active');
			menuBtn.addClass('menu-toggle--active');
		}

		$(window).scroll(function () {
			scroll = $(window).scrollTop();
			if (scroll <= height){
				logo.addClass('home_button--active');
				menuBtn.addClass('menu-toggle--active');
			} else {
				logo.removeClass('home_button--active');
				menuBtn.removeClass('menu-toggle--active');
			}
		});
	}
});

// SMOOTH SCROLL
$(function() {
	$('a[href^=#]').on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
	});
});
