'use strict'

let SideMenuView = Backbone.View.extend({

  tagName: "div",


  className: "panel-group",


  events: {
    "click #logout": "logout",
    "click #settings-btn": "goSettings",
    "click .account": "addNewPost"
  },

  initialize: function() {
     this.data = {
       user: S.user.toJSON(),
       groups: S.collection.get("groups").toJSON()
     };

    return this;
  },

  addNewPost: (e) => {
    let postView = new AddPostView(S.collection.get("accounts")
      .get(e.currentTarget.id).toJSON());
    postView.render();
  },


  goSettings: () => {
    console.log("Do something");
  },


  logout: function() {
    S.sessionDestroy();
    S.router.navigate("", { trigger: true });
    $("#main").removeClass("corp-show"); // Ugly hack :P
    S.router.index();
    this.remove();

    return this;
  },


  render: function() {
    let template = $("#side-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.attr("role", "tablist");
    this.$el.attr("aria-multiselectable", "true");
    this.$el.attr("id", "accordion");
    this.$el.html(compiled(this.data));
    $(".menu-slide").html(this.$el);

    $('[data-submenu]').submenupicker();

    return this;
  }
});
