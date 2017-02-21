'use strict'

let SchedulerCreateView = Backbone.View.extend({
  tagName: "div",
  className: "panel",

  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = Handlebars.compile(template);
    let data = {
      projects: Semitki.collection.get("projects").toJSON(),
      topics: Semitki.collection.get("topics").toJSON()
    };
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
  }
});
