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
var loadingObjects = {};

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
		if(hash.length > 1){
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

	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};

	function allLoadingDone() {
		$( document ).trigger( "siteReady");
	}

	function registerLoader(item){
		loadingObjects[item] = item;
	}

	function setLoadingItemDone(item) {
		if(loadingObjects[item]){
			delete loadingObjects[item];
		}
		if (Object.keys(loadingObjects).length === 0){

			allLoadingDone();
		}
	}

	// expose public functions
	return {
		initialize: initialize,
		scrollToAnchor: scrollToAnchor,
		extendToScreenHeight: extendToScreenHeight,
		registerLoader: registerLoader,
		loadingItemDone: setLoadingItemDone

	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.tools);
}