'use strict'

let SchedulerCreate = Backbone.View.extend({
  tagName: "div",
  className: "row",

  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = _.template(template, { name: "Template Name" }); // TODO Pass BB model
    $(this.el).html(compiled);
//    return this;
    $("#container").html(this.el);
  }
});
