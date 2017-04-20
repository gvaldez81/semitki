'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  events: {
    "click #closeadd": "closeadd"
  },


  initialize: function() {
    S.toggleNavigation();
    this.scheduler = new SchedulerCreateView();
  },


  closeadd: function() {
    S.toggleNavigation(true);
    this.remove();
    this.scheduler.render();
  },


  render: function() {
    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);

    $("#main").html(this.$el);

    return this;
  }
});
