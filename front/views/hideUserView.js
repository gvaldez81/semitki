'use strict'

let hideUserView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

  initialize: function(data) {

    this.data = data || undefined;
    
  },

  events: {
    "click #close": "close",
    "click #delete":  "hideuser"
  },

  close: function() {

    $('#dialog-crud').modal('hide')

  },

  hideuser: function (e){

    e.preventDefault();
    let username = $("#user-name").val();
    let id = $("#user-id").val();
    let dialog = new hideUserView({title: new Array(S.collection.get("user").get(id).toJSON())});
    //Update
    let model = S.collection.get("user").get(id);
    model.set({'is_active': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't User Delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("user").remove(model)
        $('#dialog-crud').modal('hide');       
        let userView = new UserView();
        userView.render(); 
        S.logger("bg-success", "Delete User Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url(username)) 
        
    }

        S.collection.get("user").add(model)
            .sync("update", model, options);
  },

  render: function(){

    let template = $("#user-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

  },

});