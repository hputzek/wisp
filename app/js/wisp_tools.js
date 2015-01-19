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

	function scrollToAnchor(hash,duration){
		var animationDuration = 500;
		if(duration > 0) {
			animationDuration = duration;
		}
		$('html,body').animate({scrollTop:$($(hash)).offset().top + -45 + 'px'}, animationDuration);
		if(hash){
			if(hash.charAt(0) == '#') {window.location.hash = hash};
		}
	}


	function extendToScreenHeight(elementSelector, nudge){
		var _nudge = '0';
		if(nudge != undefined){
			_nudge = nudge;
		}
		$(elementSelector).css('min-height', $(window).height() + _nudge + 'px');
	}

	// expose public functions
	return {
		initialize: initialize,
		scrollToAnchor: scrollToAnchor,
		extendToScreenHeight: extendToScreenHeight
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.tools);
}