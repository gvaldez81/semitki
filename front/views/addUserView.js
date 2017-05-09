'use strict'

let addUserView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

    initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #save": "saveUser"
  },

   saveUser:() =>{

    let data = {

      first_name: $("#input_fname").val(),
      last_name: $("#input_lname").val(),
      email: $("#input_email").val(),
      username: $("#input_username").val()
    };

    let user = new UserModel(data);
    S.collection.get("user")
      .add(user)
      .sync("create", user, S.addAuthorizationHeader());
    console.log("saveuser")
    //Cerramos modal
    $('#dialog-crud').modal('hide')
    //Abrimos modal de success
    bootbox.alert({
      message: "User saved",
      size: 'small',
      className: 'rubberBand animated'

    });
    
    let userView = new UserView();
        userView.render();
  },





  render: function(){
    let template = $("#user-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
