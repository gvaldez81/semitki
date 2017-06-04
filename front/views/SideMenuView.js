'use strict'

let SideMenuView = Backbone.View.extend({

  tagName: "div",


  className: "panel-group",


  events: {
    "click #logout": "logout",
    "click #settings-btn": "goSettings",
    "change .account-select": "addNewPost"
  },

  initialize: function() {
     this.data = {
       user: S.user.toJSON(),
     };

    return this;
  },

  addNewPost: (e) => {
    let sourceType = e.currentTarget.parentNode.parentNode.id;
    let value = e.currentTarget.value;
    let source_id = e.currentTarget.value;
    let postView = undefined;
    sourceType = value.substring(0,1)=='u' ? "staff-menu" : sourceType ;
    sourceType = value.substring(0,1)=='p' ? "fb-pages-menu" : sourceType ;
    

    if(sourceType === "account-menu") {
      postView = new AddPostView(S.collection.get("accounts")
        .get(source_id).toJSON());
    } else if(sourceType === "staff-menu") {
      postView = new AddPostView(S.collection.get("user")
        .get(source_id.substr(2)).toJSON());
    } else if(sourceType === "fb-pages-menu") {
      // TODO maybe it does not work, I have no pages on my test profiles
      let data = S.collection.get("pages")
        .findWhere({page_id: source_id.substr(2)}).toJSON()
      data.is_page = true;
      postView = new AddPostView(data);
    }

    if(postView !== undefined )
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
