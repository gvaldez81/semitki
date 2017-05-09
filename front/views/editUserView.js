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
                  username: $("#input_username").val()
                });

      S.collection.get("user").add(model)
        .sync("update", model, {
          url: S.fixUrl(model.url(username)),    
          headers: S.addAuthorizationHeader().headers,
               
          success: function(model, response) {
            console.log("EditUser")
            //Cerramos modal
            $('#dialog-crud').modal('hide')
            //Abrimos modal de success
            bootbox.alert({
              message: "User Edit",
              size: 'small',
              className: 'rubberBand animated'
            });
            let userView = new UserView();
            userView.render();
          },
          error: function(model, response) {
            console.log("error EditdUser")
            console.log("status = "+model.status)
            console.log("response = "+model.responseText)
            
          }
    });
 },

  render: function(){
    let template = $("#user-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
