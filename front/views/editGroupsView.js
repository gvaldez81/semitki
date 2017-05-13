'use strict'

let editGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  initialize: function(data) {
    this.data = data || undefined;
  },

  events: {
    "click #edit": "editgroup"
  },

  editgroup: function (e){

    e.preventDefault();
    let id = $("#edit-id").val();
    let dialog = new editGroupsView({title: new Array(S.collection.get("groups").get(id).toJSON())});
    let model = S.collection.get("groups").get(id);
        model.set({name: $("#input_name").val(),
        description: $("#input_description").val(),});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Group Edit", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let groupView = new GroupsView();
        groupView.render(); 
        S.logger("bg-success", "Edit Group Succesfully", true);

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
    let template = $("#group-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
