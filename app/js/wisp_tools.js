/**
 * @class WISP.tools
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

WISP.tools = (function () {
	'use strict';

	/**
	 * initialize method
	 */
	function initialize() {

	}

	function scrollToAnchor(hash,duration) {
		var animationDuration = 500;
		if(duration > 0) {
			animationDuration = duration;
		}
		$('html,body').animate({scrollTop:$($(hash)).offset().top}, animationDuration);
		if(hash.charAt(0) == '#') {
			window.location.hash = hash;
		}
	}

	// expose public functions
	return {
		initialize: initialize,
		scrollToAnchor: scrollToAnchor
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.tools);
}