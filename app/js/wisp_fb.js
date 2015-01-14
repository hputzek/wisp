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
		templateListPast: WISP.Templates["fb/list/events_past"],
		apiKey : '1535892796689202%7C9BphNqgar5Rlz5WcdTVVL1lFssQ',
		pageId: 'wispcrew',
		maxResults: '5'
	};

	var events = {};

	// this can be edited easily by using the editor: https://developers.google.com/apis-explorer/#p/plus/v1/plus.activities.list
	var dataSourceUrlEventsUpcoming = "https://graph.facebook.com/" + fbSettings.pageId + "/events?fields=cover,description,location,name,start_time,ticket_uri&since="+ Math.floor(Date.now() / 1000) + "&access_token=" + fbSettings.apiKey;
	var dataSourceUrlEventsPast = "https://graph.facebook.com/" + fbSettings.pageId + "/events?fields=cover,description,location,name,start_time,ticket_uri&since=947684981&until=" + Math.floor(Date.now() / 1000) + "&access_token=" + fbSettings.apiKey;
	/**
	 * initialize method
	 */
	function initialize() {
		initLoad();
		loadPastEvents();
	}

	function initLoad(){
		if(fbSettings.destination.length){
			events['fbSettings'] = $.makeArray(fbSettings)[0];
			$.get(dataSourceUrlEventsUpcoming,function(data,status,xhr){
				events['upcoming'] = data.data;
				var html = fbSettings.templateListUpcoming(events.upcoming);
				// Render the posts into the page
				fbSettings.destination.find('#fb-upcoming').append(html);
				$(document).foundation();
				loadEventsHandler();
			});
		}
	}

	function loadPastEvents(){
		if(fbSettings.destination.length){
			$('#trigger-fb-past').one('click',function(){
				$.get(dataSourceUrlEventsPast,function(data,status,xhr){
					events['past'] = data.data;
					var html = fbSettings.templateListPast(events.past);
					// Render the posts into the page
					fbSettings.destination.find('#fb-past').append(html);
					$(document).foundation();
				});
			});
		}
	}

	function loadEventsHandler(){
		fbSettings.destination.find('[data-event-index]').each(function(i, e){
			$(e).one('click', function(){
				var html = fbSettings.templateSingleView(events[$(e).data('event-type')][$(e).data('event-index')]);
				$(this).next('.content').append(html);
			});
		});
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
