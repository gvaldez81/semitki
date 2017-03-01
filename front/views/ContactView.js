'use strict'

let ContactView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#contact").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});