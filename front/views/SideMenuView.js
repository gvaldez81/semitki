'use strict'

let SideMenuView = Backbone.View.extend({

  tagName: "ul",


  className: "nav nav-pills nav-stacked",


  render: function() {
    let template = $("#side-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $(".menu-slide").html(this.$el);

    return this;
  }
});
