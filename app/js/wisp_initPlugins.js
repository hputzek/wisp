/**
 * @class WISP.initPlugins
 * @WISP WISP
 * @extends {}
 *
 *
 * @author Hendrik Putzek
 */



;(function($) {

	var $f = $('iframe'),
		url = $f.attr('src').split('?')[0];

	if ( window.addEventListener )
		window.addEventListener('message', onMessageReceived, false);
	else
		window.attachEvent('onmessage', onMessageReceived, false);

	function onMessageReceived(e) {

		var data = JSON.parse(e.data);

		switch (data.event) {
			case 'ready':
				$('body').css('opacity','1');
				var data = { method: 'setVolume', value: '0' };
				$f[0].contentWindow.postMessage(JSON.stringify(data), url);
				data = {method: 'seekTo', value: 15.9};
				$f[0].contentWindow.postMessage(JSON.stringify(data), url);
				data = { method: 'play' };
				$f[0].contentWindow.postMessage(JSON.stringify(data), url);
				break;
		}

	}
})(jQuery);

// Register custom media query
Foundation.utils.register_media('small-only', 'custom-mq-small-only');
Foundation.utils.register_media('medium-only', 'custom-mq-medium-only');

if (typeof WISP === 'undefined') {
	WISP = jQuery.extend({},{});
}

var wow;

WISP.initPlugins = (function () {
	'use strict';
	/**
	 * initialize method
	 */
	function initialize() {
		initStartSection();
		initMembers();
		initWow();
		initMainMenu();
		initContactForms();
		//setAnchorLinks();
	}

	function initContactForms(){
		$(".contact-form").each(function(index, element){
			$(element).on('valid', function() {
				var url = "backend/contact.php"; // the script where you handle the form input.
				$.ajax({
					type: "POST",
					url: url,
					data: $(element).serialize(), // serializes the form's elements.
					success: function(data)
					{
						alert(data); // show response from the php script.
					},
					error: function(data) {
						console.log('error');
					}
				});
				return false; // avoid to execute the actual submit of the form
			});
		});
	}

	function initMainMenu() {
		if (matchMedia(Foundation.media_queries['small-only']).matches){
			$('#topbar').scrollupbar();
		};

		$('#topbar').onePageNav({
			currentClass: 'active',
			changeHash: true,
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			filter: '',
			easing: 'swing',
			begin: function() {
				//I get fired when the animation is starting
			},
			end: function() {
				//I get fired when the animation is ending
			},
			scrollChange: function($currentListItem) {
				//I get fired when you enter a section and I pass the list item of the section
			}
		});
	}

	function initMembers() {
		if (matchMedia(Foundation.media_queries['medium']).matches){
			$(".connect-icons a").hover(function(){
				$(".connect-box").toggleClass("color-"+ this.className );
				$(".text-"+ this.className).toggleClass("show");
			});
		};

	}

	function renderMemberFlipcard(parentElement) {
		$(parentElement).find('.member-flip.no-init').flip().removeClass('no-init');
	}

	function initWow() {
		wow = new WOW(
			{
				boxClass:     'wow',      // default
				animateClass: 'animated', // default
				offset:       0,          // default
				mobile:       true,       // default
				live:         true        // default
			}
		);
		wow.init();
	}

	function setAnchorLinks () {
		$('a[href*=#]').on('click', function(event){
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
			window.location.hash = this.hash;
		});
	}

	function initStartSection() {
		if (matchMedia(Foundation.media_queries['large']).matches || matchMedia(Foundation.media_queries['medium']).matches){
			WISP.tools.extendToScreenHeight('.intro-video-wrapper, .start', -45);
			WISP.tools.extendToScreenHeight('.intro-video', 140);
			$('body').css('opacity','1');
		}
		else {
			$('.start iframe').remove();
			$('body').css('opacity','1');
			WISP.tools.extendToScreenHeight('.start', -45);
		}

	}
	// expose public functions
	return {
		initialize: initialize,
		renderMemberFlipcard: renderMemberFlipcard
	};
}) ();

// Register Bootstrap
if (typeof WISP.Bootstrap !== 'undefined') {
	WISP.Bootstrap.registerBootstrap(WISP.initPlugins);
}

$(document).foundation({
	accordion: {
		callback : function (accordion) {
			WISP.tools.scrollToAnchor(accordion.prev('a'));
		}
	},
	tab: {
		callback : function (tab) {
			WISP.initPlugins.renderMemberFlipcard($(tab).find('a').attr('href'));
		}
	}
});


$(window).on('hashchange', function(e) {
	setTimeout(function(){
		$('html,body').animate({scrollTop:$($(window.location.hash)).offset().top + -45 + 'px'}, 300);
	},5);


});