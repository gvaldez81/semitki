'use strict'

let MediaGalleryView = Backbone.View.extend({

  tagName: "div",


  className: "list-group",


  events: {
  },

  initialize: function() {
     this.data = {
       user: S.user.toJSON(),
     };

    return this;
  },

  render: function() {
    let template = $("#mediagallery-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $(".gallery-slide").html(this.$el);

    return this;
  }
});
