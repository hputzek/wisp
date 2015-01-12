/**
 * @class WISP.fb
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */

if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

WISP.fb = (function () {
	'use strict';

	var fbSettings = {
		destination: $('.fb'),
		templateSingleView: WISP.Templates["fb/view/default"],
		templateListUpcoming: WISP.Templates["fb/list/events_upcoming"],
		apiKey : '1535892796689202%7C9BphNqgar5Rlz5WcdTVVL1lFssQ',
		pageId: 'wispcrew',
		maxResults: '5'
	};

	// this can be edited easily by using the editor: https://developers.google.com/apis-explorer/#p/plus/v1/plus.activities.list
	var dataSourceUrlEventsUpcoming = "https://graph.facebook.com/" + fbSettings.pageId + "/events?fields=cover,description,location,name,start_time,ticket_uri&since=947684981&access_token=" + fbSettings.apiKey;
	var dataSourceUrlEventsPast = "";
	/**
	 * initialize method
	 */
	function initialize() {
		if(fbSettings.destination.length){
			$.get(dataSourceUrlEventsUpcoming,function(data,status,xhr){
				console.log(dataSourceUrlEventsUpcoming);
				data['fbSettings'] = $.makeArray(fbSettings)[0];
				console.log(data);
				var html = fbSettings.templateListUpcoming(data);
				// Render the posts into the page
				fbSettings.destination.append(html);
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
	WISP.Bootstrap.registerBootstrap(WISP.fb);
}

