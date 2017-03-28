'use strict'

let PricingView = Backbone.View.extend({
    tagname: "div",
    className:"row",

render: function(){
    let template = $("#pricing").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});
