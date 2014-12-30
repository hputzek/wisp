/**
 * @class WISP.initPlugins
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */

if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

var wow;

WISP.initPlugins = (function () {
	'use strict';
	initWow();
	/**
	 * initialize method
	 */
	function initialize() {

	}

	function initWow() {
		wow = new WOW(
			{
				boxClass:     'wow',      // default
				animateClass: 'animated', // default
				offset:       0,          // default
				mobile:       true,       // default
				live:         true        // default
			}
		);
		wow.init();
	}

	function setAnchorLinks () {
		$('a[href*=#]').on('click', function(event){
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
			window.location.hash = this.hash;
		});
	}

	// expose public functions
	return {
		initialize: initialize
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.initPlugins);
}