'use strict'

let DashboardView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#dashboard").html();
    let compiled = Handlebars.compile(template);
    let data = { user:Semitki.user.toJSON() };
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
  }
});
