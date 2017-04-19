'use strict'

let FooterView = Backbone.View.extend({

  tagName: "div",

  className: "container",

  render: function() {
    let data = {
      pages: S.static_pages.toJSON()
    };
    let template = $("#footer-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#app-footer").html(this.$el);

    return this;
  }
});
