'use strict'

let AccountInfoView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#accountinfo").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});