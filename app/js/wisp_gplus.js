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
		apiKey : 'AIzaSyBLdQ2B088Q48gkU1R3Iag8yyeZrJVvGpk',
		//userId : '114550729912503618750',
		userId: '117597993419137338682',
		maxResults: '5'
	};

	// this can be edited easily by using the editor: https://developers.google.com/apis-explorer/#p/plus/v1/plus.activities.list
	var dataSourceUrl= "https://www.googleapis.com/plus/v1/people/" + gplusSettings.userId + "/activities/public?maxResults=" + gplusSettings.maxResults + "&fields=items(actor(displayName%2Cimage%2Curl)%2Cobject%2Cpublished)%2Ckind%2Ctitle&key=" + gplusSettings.apiKey;
	/**
	 * initialize method
	 */
	function initialize() {
		if(gplusSettings.destination.length){
			$.get(dataSourceUrl,function(data,status,xhr){
					data.items['gplusSettings'] = $.makeArray(gplusSettings)[0];
					console.log(data);
					var html = gplusSettings.template(data);
					// Render the posts into the page
					gplusSettings.destination.append(html);
				$(document).foundation();
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

