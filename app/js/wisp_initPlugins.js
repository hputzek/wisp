/**
 * @class WISP.initPlugins
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

WISP.initPlugins = (function () {
	'use strict';
	/**
	 * initialize method
	 */
	function initialize() {
		initMembers();
		initWow();
		initMainMenu();
		initContactForms();
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
		$('#topbar').scrollupbar();
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
		$(".connect-icons a").hover(function(){
			$(".connect-box").toggleClass("color-"+ this.className );
			$(".text-"+ this.className).toggleClass("show");
		});
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
			console.log(accordion.prev('a'));
			WISP.tools.scrollToAnchor(accordion.prev('a'));
		}
	},
	tab: {
		callback : function (tab) {
			WISP.initPlugins.renderMemberFlipcard($(tab).find('a').attr('href'));
		}
	}
});