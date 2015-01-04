(function() {
    module.exports.register = function(Handlebars, options) {

        Handlebars.registerHelper("include", function(eingang) {
           return eingang
        });
    };
}).call(this);