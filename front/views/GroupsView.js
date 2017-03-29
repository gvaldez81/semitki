'use strict'

let GroupsView = Backbone.View.extend({
  tagName:"div",

  events: {
    "click #save": "save",
    "click #delete": "delete"
  },

  save: () => {
    let data = {
      name: $("#name").val(),
      description: $("#description").val(),
      socialaccounts: []
    };
    let group = new Group(data);
    Semitki.collection.get("groups")
      .add(group)
      .sync("create", group, Semitki.addAuthorizationHeader());
  },


  delete: () => {
    let groups = Semitki.collection.get("groups");
    let group = groups.get($("#groupFinder").val());
    groups.sync("delete", group, Semitki.addAuthorizationHeader());
  },


  render: function() {
    let data = {
      "groups": Semitki.collection.get("groups").toJSON()
    }
    let template = $("#group-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    // Initialie controls
    $("#groupFinder").select2();

    return this;
  }
});
