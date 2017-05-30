'use strict'

let GroupMenuView = Backbone.View.extend({

  tagName: "div",

  className: "panel-body",

  initialize: function() {
    this.data = {
      groups: S.collection.get("groups").toJSON()
    };

    return this;
  },


  render: function() {
    let template = $("#group-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#group-menu").html(this.$el);

    return this;
  }

});
