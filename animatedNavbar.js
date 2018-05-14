import $ from 'jquery';

class AnimatedNavbar {
	constructor(data) {
		this.header = data.header;

		this.didScroll;
		this.lastScrollTop = 0;
		this.delta = 5;
		this.headerHeight = data.header.outerHeight();
		this.scrollTop;

		this.events();
	}

	events() {
		const that = this;

		$(window).scroll(function(e) {
			that.didScroll = true;
			that.scrollTop = $(this).scrollTop();
		});

		setInterval(function() {
			if (that.didScroll) {
				that.hasScrolled();
				that.didScroll = false;
			}
		}, 250);
	}

	hasScrolled() {
		const that = this,
			  $header = that.header;

		if(Math.abs(that.lastScrollTop - that.scrollTop) <= that.delta)
			return;

		// Scroll Down
		if(that.scrollTop > that.lastScrollTop && that.scrollTop > that.headerHeight) {
			$header.removeClass('is-down').addClass('is-up');
		} else {
			// Scroll Up
			if(that.scrollTop + $(window).height() < $(document).height()) {
				$header.removeClass('is-up').addClass('is-down');
			}
		}

		this.lastScrollTop = that.scrollTop;
	}
}

export default {
	init(data) {
		this.animatedNavbar = new AnimatedNavbar(data);
	}
}