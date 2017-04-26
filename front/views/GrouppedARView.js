'use strict'

let GrouppedARView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
  },

  render: function () {

    let data = {
      groups: S.collection.get("groups").toJSON()
    };

    let template = $("#groupped-art").html();
    let compiled = Handlebars.compile(template);

    this.navigation.render();
    this.footer.render();

    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    $("#main").html(this.$el);

    $("#groupName").select2();

    return this;
  }
});
