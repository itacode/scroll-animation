// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});
	while (length--) {
		method = methods[length];
		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// polyfill
if (!Object.create) {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

;(function ($, window, document, undefined) {

	var throttle = function throttle(callback, limit) {
		var wait = false;
		return function () {
			if (!wait) {
				callback.call();
				wait = true;
				setTimeout(function () {
					wait = false;
				}, limit);
			}
		};
	};

	$(document).ready(function () {
		var $navButtons = $('.js_nav_btn'),
			$sections = $('.js_section'),
			sectionsOffsets = {},
			$htmlBody = $('html, body'),
			navGap = 60,
			$window = $(window);

		var getSectionsData = function getSectionsData($sections, sectionsOffsets) {
			$sections.each(function () {
				var id,
					$that = $(this);
				id = $that[0].id;
				sectionsOffsets[id] = $that.offset().top;
			});
		}
		var scrollHandler = function scrollHandler() {
			var scrtop = $window.scrollTop();
			for (var key in sectionsOffsets) {
				if ((scrtop + navGap >= sectionsOffsets[key]) && (scrtop + navGap - sectionsOffsets[key] < 100)) {
					$navButtons.removeClass('active').filter('[href="#' + key + '"]').addClass('active');
				}
			}
		};
		getSectionsData($sections, sectionsOffsets);
		$navButtons.on('click', function clickHandler(e) {
			var toScroll,
				secId;
			secId = $(this)[0].hash.substr(1);
			toScroll = sectionsOffsets[secId];
			e.preventDefault();
			$htmlBody.animate({
				scrollTop: toScroll - navGap
			}, 1000, function () {
				$navButtons.removeClass('active').filter('[href="#' + secId + '"]').addClass('active');
			});
		});
		scrollHandler();
		$(window).on('scroll', throttle(scrollHandler, 1000/16), scrollHandler);
	});
})(jQuery, window, document);