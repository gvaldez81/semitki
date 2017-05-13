'use strict'

let hideGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },


  events: {
    "click #close": "close",
    "click #delete": "hidegroup",
   },

  close: function() {
       $('#dialog-crud').modal('hide')
      },

  hidegroup: function (e){

    e.preventDefault();
    let id = $("#group-id").val();
    let dialog = new hideGroupsView({title: new Array(S.collection.get("groups").get(id).toJSON())});
    //Update
    let model = S.collection.get("groups").get(id);
    model.set({'isactive': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't group delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("groups").remove(model)
        $('#dialog-crud').modal('hide');       
        let groupView = new GroupsView();
        groupView.render(); 
        S.logger("bg-success", "Delete Group succesfully", true);

      },

      wait: true,
      headers: S.addAuthorizationHeader().headers,
      url: S.fixUrl(model.url()) 
        
    }

    let group = S.collection.get("groups");
    S.collection.get("groups").add(model)
        .sync("update", model, options);
  },


  render: function(){

    let template = $("#group-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

  },


});
