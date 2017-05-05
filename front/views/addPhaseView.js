'use strict'

let addPhaseView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "click #save": "savePhases",
  },


 savePhases:() =>{

    let data = {
      name: $("#input_name").val(),
      description: $("#input_description").val(),
      isactive: "false",
      //TODO 
      campaign: "http:"+apiBuilder("campaign/"+$("#campaign").val())

    };

    let phase = new Phase(data);
    S.collection.get("phases")
      .add(phase)
      .sync("create", phase, S.addAuthorizationHeader());
    console.log("savephase")
    //Cerramos modal
    $('#dialog-crud').modal('hide')
    //Abrimos modal de success
    bootbox.alert({
      message: "Phase saved",
      size: 'small',
      className: 'rubberBand animated'
    });

    let fatherV = new PhaseView();
    fatherV.render();
  },

  initialize: function(data) {
    this.data = data || undefined;
  },



  render: function(){
         let data = {
        
      campaign: S.collection.get("campaigns").toJSON()
 
      };

    let template = $("#phase-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#dialog-crud").html(this.$el);
  },


});
