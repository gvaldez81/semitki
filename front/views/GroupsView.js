'use strict'

let GroupsView = Backbone.View.extend({
  tagName:"div",
  className:"row",

    initialize: function () {

    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal_add = new addGroupsView();
    this.modal_edit = new editGroupsView();
  },
  
  events: {
    "click #save": "save",
    "click #delete": "delete",
    "click .add_group": "addItem",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
  },

  save: () => {

    let data = {
      name: $("#name").val(),
      description: $("#description").val(),
      socialaccounts: []

    };

    let group = new Group(data);
    S.collection.get("groups")
      .add(group)
      .sync("create", group, S.addAuthorizationHeader());

  },


  delete: () => {

    let groups = S.collection.get("groups");
    let group = groups.get($("#groupFinder").val());
    groups.sync("delete", group, S.addAuthorizationHeader());
  
  },

  addItem: () => {

    let dialog = new addGroupsView();
    dialog.render();

  },

  hideItem: function(ev) {

    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideGroupsView({item: new Array(S.collection.get("groups").get(id).toJSON())});
    dialog.render();

  },

  editItem: function(ev) {

    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editGroupsView({item: new Array(S.collection.get("groups").get(id).toJSON())});
    dialog.render();

  },

  render: function() {

    this.modal_add.render();
    this.modal_edit.render();

    let data = {
      "groups": S.collection.get("groups").toJSON()

    }

    let template = $("#group-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    $("#main").html(this.$el);

    S.showButtons();
    return this;
  }
  
});
