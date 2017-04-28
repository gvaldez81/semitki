'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {

    this.navigation = new NavigationView();
    this.footer = new FooterView();
    S.users.fetch(S.addAuthorizationHeader());

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
    user.save(data, S.addAuthorizationHeader());
  },


  delete: () => {
    let user = S.users.get($("#userFinder").val());
    S.users.sync("delete", user, S.addAuthorizationHeader());
  },


  render: function() {
    //S.users = new Users();
    // TODO probably better fetching on user demand rather than on the render
    console.log(S.users.toJSON());
    let data = {
      users: S.users.toJSON(),
    };
    console.log(data);
    let template = $("#user-template").html();
    let compiled = Handlebars.compile(template);

    this.$el.html(compiled(data));
    $("#container").html(this.$el);
     $("#main").html(this.$el);
    // Initialization
    $("#userFinder").select2();

    return this;
  }
});
