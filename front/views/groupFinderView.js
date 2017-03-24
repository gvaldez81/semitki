'use strict'

let GroupFinderView = Backbone.View.extend({
  tagName: "div",

  className: "col-md-12 table-responsive",



  render: function() {
    let template = $("#group-finder-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.collection[0].attributes));
    $("#groupFinderItems").html(this.$el);
    return this;
  }
});
