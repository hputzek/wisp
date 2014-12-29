
/* ---------------
 *  This is a template file for setting up a new bootstrap
 *  Cahcnge "wispcast" to any name that you wish and that is not used already in the WISP-Namespace.
 *
 * */



/**
 * @class WISP.wispcast
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */

if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

WISP.wispcast = (function () {
	'use strict';
	var config = {
		'$playerIframeElement' : $('<iframe></iframe>'),
		'playerId': 'soundcloud-widget',
		'$trackGridElement': $('.wispcast-grid'),
		'trackData': null
	};

	var widget = null;

	/**
	 * initialize method
	 */
	function initialize() {
		createIframe($('.wispcast-player'));
		initPlayerWidget();
	}

	function createIframe($elementToAppend){
		config.$playerIframeElement.attr('id',config.playerId);
		config.$playerIframeElement.attr('src','https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/27841327&amp;auto_play=false&amp;hide_related=false&amp;visual=false');
		config.$playerIframeElement.css('height','130px');
		$elementToAppend.append(config.$playerIframeElement);
	}

	function initPlayerWidget(){
		widget = SC.Widget(config.playerId);
		widget.bind(SC.Widget.Events.READY, onReady);
	}

	function onReady(){
		widget.getSounds(function (allTracks) {
			config.trackData = addArtworkUrls(allTracks);
			renderTrackGrid();
		});
	}

	function addArtworkUrls(allTracks) {

		for (var key in allTracks) {
			if (allTracks.hasOwnProperty(key)) {
				allTracks[key]['artwork_url_large'] = allTracks[key]['artwork_url'].replace('large','t300x300');
			}
		}
		return allTracks;
	}

	function renderTrackGrid(){
		if($(config.$trackGridElement).length){
			var templateData = [];
			templateData['wispcastSettings'] = $.makeArray(config)[0];
			var html = WISP.Templates["soundcloud/wispcast-grid"];
			// Render the grid into the page
			config.$trackGridElement.append(html(templateData));
			console.log(templateData);
			$('body').on('click','[data-wispcast-tracknumber]',function(){
				var tracknumber= $(this).data('wispcast-tracknumber');
				widget.skip(tracknumber);
			})
		}
	}

	// expose public functions
	return {
		initialize: initialize
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.wispcast);
}