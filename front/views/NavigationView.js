'use strict'

let NavigationView = Backbone.View.extend({

  tagName: "div",

  className: "container",


  events: {
    "click #addpost-btn": "addNewPost"
  },


  addNewPost: () => {
    let postView = new AddPostView();
    postView.render();
  },


  render: function() {
    let template = $("#navigation-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#app-nav").html(this.$el);

    return this;
  }
});
