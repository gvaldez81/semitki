'use strict'

let NavigationView = Backbone.View.extend({

  tagName: "div",
  className: "container",

  render: function() {
    this.$el.html(S.handlebarsCompile("#navigation-template"));
    $("#app-nav").html(this.$el);

    return this;
  }
});
