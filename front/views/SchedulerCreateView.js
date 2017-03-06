'use strict'

let SchedulerCreateView = Backbone.View.extend({
  tagName: "div",
  className: "panel",

  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = Handlebars.compile(template);
    Semitki.fetchCollections();
    let posts = new Posts();
    posts.fetch(Semitki.addAuthorizationHeader());
    let data = {
      user: Semitki.user.toJSON(),
      posts: posts.toJSON(),
      projects: Semitki.collection.get("projects").toJSON(),
      topics: Semitki.collection.get("topics").toJSON(),
      buckets: Semitki.collection.get("buckets").toJSON(),
    };
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    $('#scheduledForPicker').datetimepicker();
  }
});
