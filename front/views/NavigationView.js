'use strict'

let NavigationView = Backbone.View.extend({

  tagName: "div",
  className: "container",

  addNewPost: () => {
    let data = S.user.toJSON()
    S.collection.get("pages").filtering(S.user.get('bucket_id'));

    let postView = new AddPostView(data);
    postView.render();
  },

  render: function() {
    let template = $("#navigation-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#app-nav").html(this.$el);

    return this;
  }
});
