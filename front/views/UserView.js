'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: () => {
    Semitki.users.fetch(Semitki.addAuthorizationHeader());
  },


  events: {
    "click #save": "save",
    "click #delete": "delete"
  },


  save: () => {
    let data = {
      username: $("#username").val(),
      email: $("#email").val(),
      first_name: $("#fname").val(),
      last_name: $("#lname").val()
    };
    let user = new UserModel();
    user.save(data, Semitki.addAuthorizationHeader());
  },


  delete: () => {
    let user = Semitki.users.get($("#userFinder").val());
    Semitki.users.sync("delete", user, Semitki.addAuthorizationHeader());
  },


  render: function() {
    //Semitki.users = new Users();
    // TODO probably better fetching on user demand rather than on the render
    console.log(Semitki.users.toJSON());
    let data = {
      users: Semitki.users.toJSON(),
    };
    console.log(data);
    let template = $("#user-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    // Initialization
    $("#userFinder").select2();

    return this;
  }
});
