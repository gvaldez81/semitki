'use strict'

let SideMenuView = Backbone.View.extend({

  tagName: "ul",

  className: "sidebar-nav nav-pills nav-stacked",

  initialize: function() {
    this.template = S.handlebarsCompile("#side-menu-template");
    this.data = {};
    this.on('ready', this.post_render);
  },

  events: {
    "click #logout": "logout",
    "change .account-select": "addNewPost",
    "click a#campaigns": "chooser",
    "click a#phases": "chooser",
    "click a#groups": "chooser",
    "click a#grouppedaccounts": "chooser",
    "click a#user": "chooser"
  },

  chooser: (e) => {
    e.preventDefault();
    switch(e.target.id) {
        case 'campaigns':
          S.view.get('campaign').render();
          break;
        case 'phases':
          S.view.get('phase').render();
          break;
        case 'groups':
          S.view.get('group').render();
          break;
        case 'grouppedaccounts':
          S.view.get('grouped_account').render();
        case 'user':
          S.view.get('user').render();
          break;
    }
  },

  post_render: () => {
    S.view.get('follower_menu').render();
    S.view.get('staff_menu').render();
  },

  addNewPost: (e) => {
    let sourceType = e.currentTarget.parentNode.parentNode.id;
    let value = e.currentTarget.value;
    let source_id = e.currentTarget.value;
    let postView = undefined;
    sourceType = value.substring(0, 1)=='u' ? "staff-menu" : sourceType;
    sourceType = value.substring(0, 1)=='p' ? "fb-pages-menu" : sourceType;

    if(sourceType === "account-menu") {
      let data = S.collection.get("accounts")
        .get(source_id).toJSON()
      data.username = data.username
      postView = new AddPostView(data);
    } else if(sourceType === "staff-menu") {
      let data = S.collection.get("user")
        .get(source_id.substr(2)).toJSON()
      data.username = data.first_name + ' ' + data.last_name

      postView = new AddPostView(data);
    } else if(sourceType === "fb-pages-menu") {
      // TODO maybe it does not work, I have no pages on my test profiles
      let data = S.collection.get("pages")
        .findWhere({page_id: source_id.substr(2)}).toJSON()
      data.username = data.name

      data.is_page = true;
      postView = new AddPostView(data);
    }

    if(postView !== undefined )
      postView.render();
  },


  logout: function() {
    S.toggleNavigation(false);
    S.sessionDestroy();
    $("#main").removeClass("corp-show"); // Ugly hack :P
    this.remove();
    location.assign('/');
  },

  render: function() {
    this.data.user = S.user.toJSON();
    this.$el.attr("id", "menu");
    this.$el.html(this.template(this.data));
    $("#sidebar-wrapper").html(this.$el);

    this.trigger('ready');

    return this;
  }
});
