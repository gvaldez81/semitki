'use strict'

let SchedulerCreate = Backbone.View.extend({
  tagName: "div",
  className: "panel",

  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = _.template(template, {name: "scheduler"}); // TODO Pass BB model
    //let compiled = _.template(template, this.model.toJSON()); // TODO Pass BB model
    this.$el.html(compiled);
//    return this;
    $("#container").html(this.el);
  }
});
