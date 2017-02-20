'use strict'

let DashboardView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#dashboard").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(Semitki.user.toJSON()));
    $("#container").html(this.$el);
  }
});
