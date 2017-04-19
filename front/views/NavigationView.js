'use strict'

let NavigationView = Backbone.View.extend({

  tagName: "div",

  className: "container",

  render: function() {
    let template = $("#navigation-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#app-nav").html(this.$el);

    return this;
  }
});
