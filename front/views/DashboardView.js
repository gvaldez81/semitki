'use strict'

let DashboardView = Backbone.View.extend({
    tagName:"div",
    className:"panel-body",

  render: function() {
    let template = $("#dashboard").html();
    let compiled = _.template(template, { name: "Dashboard"});
    this.$el.html(compiled);
    $("#container").html(this.$el);
}
});

