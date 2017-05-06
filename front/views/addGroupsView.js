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

  saveGroup:() =>{

    let data = {

      name: $("#input_name").val(),
      description: $("#input_description").val(),

    };

    let group = new Group(data);
    S.collection.get("groups")
      .add(group)
      .sync("create", group, {
          //url: S.fixUrl(model.url()),
          headers: S.addAuthorizationHeader().headers,
        success: function(model, response) {
         console.log("saveGroup")
              //Cerramos modal
            $('#dialog-crud').modal('hide')
            //Abrimos modal de success
            bootbox.alert({
              message:   "Group Saved",
              size:      'small',
              className: 'rubberBand animated'
            });

          let groupView = new GroupsView();
              groupView.render();

          },

          error: function(model, response) {
            console.log("error editGroup")
            console.log("status = "+model.status)
            console.log("response = "+model.responseText)

          }
    });       
},

  render: function(){
    let template = $("#group-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
