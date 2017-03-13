'use strict'

let BillingView = Backbone.View.extend({
    tagName:"div",
    className:"row",
    
render: function(){
    let template = $("#billing").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});