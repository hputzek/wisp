this["WISP"] = this["WISP"] || {};
this["WISP"]["Templates"] = this["WISP"]["Templates"] || {};

this["WISP"]["Templates"]["soundcloud/wispcast-grid"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "		<li data-wispcast-tracknumber=\""
    + escapeExpression(lambda((data && data.index), depth0))
    + "\"><span title=\""
    + escapeExpression(lambda((depth0 != null ? depth0.title : depth0), depth0))
    + "\"><img src=\""
    + escapeExpression(lambda((depth0 != null ? depth0.artwork_url : depth0), depth0))
    + "\"/></span></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<ul class=\"small-block-grid-3 medium-block-grid-10\">\n";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 != null ? depth0.wispcastSettings : depth0)) != null ? stack1.trackData : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>\n";
},"useData":true});