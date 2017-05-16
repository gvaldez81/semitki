'use strict'

let editUserView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

    initialize: function(data) {
    this.data = data || undefined;
  },


  events: {
    "click #edit": "edituser"
  },



    edituser: (ev) => {

    let username= $("#user-name").val();
    let id = $("#user-id").val();
    let model = (S.collection.get("user").get(id));
        model.set({
                  first_name: $("#input_name").val(),
                  last_name: $("#input_lastname").val(),
                  email: $("#input_email").val(),
                  username: $("#input_username").val()});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't User Edit", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let userView = new UserView();
        userView.render(); 
        S.logger("bg-success", "Edit User Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url(username)) 

 }

        S.collection.get("user").add(model)
        .sync("update", model, options);
},

  render: function(){

    let template = $("#user-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

  },

});