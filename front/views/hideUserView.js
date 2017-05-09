'use strict'

let hideUserView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #delete": "delete",
    "click .process_button": "doProcess"
  },

    delete: () => {   

    let username= $("#user-name").val();
    let id = $("#user-id").val();
    let model = (S.collection.get("user").get(id));
        model.set({'is_active': false});    

    S.collection.get("user").add(model)
        .sync("update", model, {
          url: S.fixUrl(model.url(username)),    
          headers: S.addAuthorizationHeader().headers,
               
          success: function(model, response) {
            S.collection.get("user").remove(model)
            console.log("DeleteUser")
            //Cerramos modal
            $('#dialog-crud').modal('hide')
            //Abrimos modal de success
            bootbox.alert({
              message: "User Delete",
              size: 'small',
              className: 'rubberBand animated'
            });
            let userView = new UserView();
            userView.render();
          },
          error: function(model, response) {
            console.log("error DeletedUser")
            console.log("status = "+model.status)
            console.log("response = "+model.responseText)
            
          }
    });
 },


  render: function(){
    let template = $("#user-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
