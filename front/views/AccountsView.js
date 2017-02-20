'use strict'

let AccountsView = Backbone.View.extend({
    tagName:"div",
    className:"row",

  render: function() {
    let template = $("#accounts").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});
