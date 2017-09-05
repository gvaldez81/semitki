'use strict'

let FooterView = Backbone.View.extend({

  tagName: "div",

  className: "container",

  initialize: function() {
    this.template = S.handlebarsCompile("#footer-template");
  },

  render: function() {
    this.$el.html(this.template);
    $("#app-footer").html(this.$el);

    return this;
  }
});
