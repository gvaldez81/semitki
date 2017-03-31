'use strict'

let SemitkiFooter = Backbone.View.extend({

  tagName: "div",

  className: "row",

  render: function() {
    let data = {
      pages: S.static_pages.toJSON()
    };
    let template = $("#footer-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("footer").html(this.$el);

    return this;
  }
});
