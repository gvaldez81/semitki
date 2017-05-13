'use strict'

let addGroupsView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "click #save": "saveGroup"
  },


  initialize: function(data) {
    this.data = data || undefined;
  },

  saveGroup: function(e) {   
    e.preventDefault();
    let options = {

      error: (error) => {
        $('#dialog-crud').modal('hide');
        let groupView = new GroupsView();
        groupView.render();          
        S.logger("bg-danger", "Couldn't group save", true);

      },

      success: (model, reponse) => {
        console.log(model);
        $('#dialog-crud').modal('hide');       
        let groupView = new GroupsView();
        groupView.render(); 
        S.logger("bg-success", "Save Group succesfully", true);
      },

      wait: true,
      headers: S.addAuthorizationHeader().headers            
    }

    let group = S.collection.get("groups")
        .create(this.addgroup(), options);
        console.log("Group");

  },

  addgroup:() =>{
    let groups = {
      name: $("#input_name").val(),
      description: $("#input_description").val()
    };
    let groupModel = new Group(groups); 
    return groupModel;

  },

  render: function(){
    let template = $("#group-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
