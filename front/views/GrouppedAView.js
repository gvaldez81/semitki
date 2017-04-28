'use strict'

let GrouppedAView = Backbone.View.extend({
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
    if (S.collection.get("filter")!== undefined) {
      data.groupped = S.collection.get("filter").toJSON()

    }
    Handlebars.registerHelper('lookup2', function (collection, id) {
      var collectionLength = collection.length;

      for (var i = 0; i < collectionLength; i++) {
        if (collection[i].id === id) {
          return collection[i];
        }

      }

      return null;
    });
    let template = $("#grouppedaccount-a").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#relateda").html(this.$el);
    return this;

  }
});
