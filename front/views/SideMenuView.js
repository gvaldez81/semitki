'use strict'

let SideMenuView = Backbone.View.extend({

  tagName: "ul",


  className: "nav nav-pills nav-stacked",


  initialize: function() {
    this.data = {
      user: S.user.toJSON()
    };
  },


  events: {
    "click #logout": "logout",
    "click #settings-btn": "goSettings"
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
  },


  render: function() {
    let template = $("#side-menu-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $(".menu-slide").html(this.$el);

    return this;
  }
});
