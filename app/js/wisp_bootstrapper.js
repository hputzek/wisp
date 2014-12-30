/**
 * @class WISP
 * @WISP WISP
 * @extends {}
 *
 * The main entry point which controls the lifecycle of the application.
 */
if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

$(document).foundation({
	accordion: {
		callback : function (accordion) {
			console.log(accordion.prev('a'));
			WISP.tools.scrollToAnchor(accordion.prev('a'));
		}
	}
});

$(document)
	.on('open.fndtn.offcanvas', '[data-offcanvas]', function() {
		$('.off-canvas-list').css({
			position: "relative",
			top: $('body').scrollTop()
		});
		$('html').css('overflow', 'hidden');
	})
	.on('close.fndtn.offcanvas', '[data-offcanvas]', function() {
		$('html').css('overflow', 'auto');
	});

WISP.Bootstrap = (function () {
	// use strict mode
	'use strict';

	// init variables first
	var bootstrappers = [];


	/**
	 * Main bootstrap. This is called by on Ready and calls all registered bootstraps.
	 *
	 * This method is called automatically.
	 */
	function bootstrap() {
		_invokeBootstrappers();
	};

	/**
	 * Registers a new bootstrap class.
	 *
	 * @param bootstrap The bootstrap class to be registered.
	 * @api
	 */
	function registerBootstrap(bootstrap) {
		bootstrappers.push(bootstrap);
	};


	// private
	/**
	 * Invoke the registered bootstrappers init function
	 */
	function _invokeBootstrappers() {
		jQuery.each(
			bootstrappers,
			function(index, bootstrapper) {
				bootstrapper.initialize();
			}
		);
	};

	// expose public functions
	return {
		bootstrap: bootstrap,
		registerBootstrap: registerBootstrap
	};
}) ();

/**
 * on document ready call the onDocumentReady function of the application bootstrapper
 */

$(document).ready(WISP.Bootstrap.bootstrap);
