/*
 * This file contains handlebars helpers
 *
 * */


String.prototype.format = function(args, index) {
	return this.replace(/{(\w+)}/g, function(match, number) {
		return typeof args[index[number]] != 'undefined'
			? args[index[number]]
			: match
			;
	});
};

// http://stackoverflow.com/questions/10138518/handlebars-substring
Handlebars.registerHelper('trimS', function(passedString, start, length ){
	if(passedString != undefined){
		var mlength = length,preS='',tailS='';
		if(start>0 && passedString.length>3){
			var preS= '...';
			mlength = length -3;
		} ;
		if(passedString.length>(start + length )){
			tailS = '...';
			mlength = mlength -3;
		};
		var theString = preS + passedString.substr(start, mlength) + tailS;
		return new Handlebars.SafeString(theString);
	}
});

Handlebars.registerHelper('getFirstLine', function(passedString){
	if(passedString != undefined){
		var theString = passedString.split('<br />');
		theString = theString[0];
		return new Handlebars.SafeString(theString);
	}
});

Handlebars.registerHelper('removeFirstLine', function(passedString){
	if(passedString != undefined){
		var theString = passedString.slice(passedString.indexOf('<br />'));
		return theString;
	}
});




// http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

	if (arguments.length < 3)
		throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

	operator = options.hash.operator || "==";

	var operators = {
		'==':       function(l,r) { return l == r; },
		'===':      function(l,r) { return l === r; },
		'!=':       function(l,r) { return l != r; },
		'<':        function(l,r) { return l < r; },
		'>':        function(l,r) { return l > r; },
		'<=':       function(l,r) { return l <= r; },
		'>=':       function(l,r) { return l >= r; },
		'typeof':   function(l,r) { return typeof l == r; }
	}

	if (!operators[operator])
		throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

	var result = operators[operator](lvalue,rvalue);

	if( result ) {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}

});

// example: {{{formatDate 'published' '<i class="fa fa-calendar-o"></i> {dd}.{MM}.{yyyy} <i class="fa fa-clock-o"></i> {hh}:{mm}'}}}

Handlebars.registerHelper('formatDate',function(input, pattern){
	var iso = /^(\d{4})(?:-?W(\d+)(?:-?(\d+)D?)?|(?:-(\d+))?-(\d+))(?:[T ](\d+):(\d+)(?::(\d+)(?:\.(\d+))?)?)?(?:Z(-?\d*))?$/;
	if(this[input]) {
		var asIso = new Date(this[input]).toISOString();
		var parts = asIso.match(iso);
		return pattern.format(parts, {yyyy:1,MM:4,dd:5,hh:6,mm:7,ss:8,SSS:9});
	}
	return this[input];
});

(function(){
	// defines markup enhancement regex
	var protocol = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim
		, scheme   = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

	/*
	 * Registers a Helper method with handlebars which, given a string of
	 * plain text or existing markup, provides enhancements of plain text
	 * URLs, converting them to their respective anchor tag equivilents.=
	 */
	Handlebars.registerHelper('enhance', function(text) {
		text = Handlebars.Utils.escapeExpression(text);
		text = text.replace( protocol, '<a href="$1" target="_blank">$1</a>');
		text = text.replace( scheme,   '$1<a href="http://$2" target="_blank">$2</a>' );
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new Handlebars.SafeString( text );
	});
}());