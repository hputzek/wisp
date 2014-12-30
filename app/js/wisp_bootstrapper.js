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
