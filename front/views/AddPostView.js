'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  initialize: function() {
    S.toggleNavigation();
  },


  render: function() {
    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);

    $("#main").html(this.$el);

    return this;
  }
});
