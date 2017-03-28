'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

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
    let resource = new UserModel();
    resource.save(data, Semitki.addAuthorizationHeader());
  },

  render: function() {
    //Semitki.users = new Users();
    // TODO probably better fetching on user demand rather than on the render
    Semitki.users.fetch(Semitki.addAuthorizationHeader());
    let data = {
      users: Semitki.users.toJSON(),
    };
    let template = $("#user-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    // Initialization
    $("#userFinder").select2();

    return this;
  }
});
