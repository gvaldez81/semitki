'use strict'

let SideMenu = Backbone.View.extend({


  render: function() {
    let template = $("#side-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled());
    $("#side-menu").html(this.$el);

    S.toggleMenu();

    return this;
  }
});
