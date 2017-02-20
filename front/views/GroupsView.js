'use strict'

let GroupsView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#groups").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});