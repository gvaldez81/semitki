'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {
    this.template = S.handlebarsCompile("#user-template");
    this.tour = S.tour('UserView');
  },


  events: {
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },


  save: () => {
    let data = {
      username: $("#username").val(),
      email: $("#email").val(),
      first_name: $("#fname").val(),
      last_name: $("#lname").val()
    };

    let user = new UserModel();
    user.save(data, S.addAuthorizationHeader());

  },

  delete: () => {
    let user = S.users.get($("#userFinder").val());
    S.users.sync("delete", user, S.addAuthorizationHeader());
  },


  addItem: () =>{
    let dialog = new addUserView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },

  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },


  render: function() {
    let data = {
      users: S.collection.get("user").toJSON() //.where({is_superuser: false})

    };

    this.$el.html(this.template(data));
    $("#main").html(this.$el);

    S.showButtons();

    if (this.tour != undefined){
          this.tour.start(true);
    }

    return this;
  }
});
