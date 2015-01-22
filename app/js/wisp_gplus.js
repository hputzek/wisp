/**
 * @class WISP.gPlus
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */

if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

WISP.gPlus = (function () {
	'use strict';

	var gplusSettings = {
		destination: $('.gplus'),
		template: WISP.Templates["gplus/posts/list"],
		apiKey : 'AIzaSyCPRAue-Xdpq-yBGU0P15E4exRh11PCABc',
		//userId : '114550729912503618750',
		userId: '101075344287505368115',
		maxResults: '5'
	};

	// this can be edited easily by using the editor: https://developers.google.com/apis-explorer/#p/plus/v1/plus.activities.list
	var dataSourceUrl= "https://www.googleapis.com/plus/v1/people/" + gplusSettings.userId + "/activities/public?maxResults=" + gplusSettings.maxResults + "&fields=items(url%2Ckind%2Cobject%2Cupdated%2Cactor(displayName%2Cimage%2Curl)%2Clocation)%2Ckind&maxResults=5&key=" + gplusSettings.apiKey;
	/**
	 * initialize method
	 */
	function initialize() {
		if(gplusSettings.destination.length){
			WISP.tools.registerLoader('soundcloud');
			$.get(dataSourceUrl,function(data,status,xhr){
				data.items['gplusSettings'] = $.makeArray(gplusSettings)[0];
					var html = gplusSettings.template(data);
					// Render the posts into the page
					gplusSettings.destination.append(html);
				$(document).foundation();
				WISP.tools.loadingItemDone('soundcloud');
			});
		}
	}

	// expose public functions
	return {
		initialize: initialize
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.gPlus);
}

