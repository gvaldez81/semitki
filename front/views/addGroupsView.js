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

      first_name: $("#input_name").val(),
      last_name: $("#input_description").val(),

    };

    let group = new Group(data);
    S.collection.get("groups")
      .add(group)
      .sync("create", group, S.addAuthorizationHeader());
    console.log("savegroup")
    //Cerramos modal
    $('#dialog-crud').modal('hide')
    //Abrimos modal de success
    bootbox.alert({
      message: "Group saved",
      size: 'small',
      className: 'rubberBand animated'
    });
  },


  render: function(){
    let template = $("#group-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
