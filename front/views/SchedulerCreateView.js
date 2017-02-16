'use strict'

let SchedulerCreateView = Backbone.View.extend({
  tagName: "div",
  className: "panel",

  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = Handlebars.compile(template); // TODO Pass BB model
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});
