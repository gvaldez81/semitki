'use strict'

let addPhaseView = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

    initialize: function(data) {
    this.data = data || undefined;
  },


  events: {
    "click #save": "savePhases",
  },


 savePhases:() =>{

    let data = {
      name: $("#input_name").val(),
      description: $("#input_description").val(),
      campaign: "http:"+apiBuilder("campaign/"+$("#campaign").val())

    };

    let phase = new Phase(data);
    S.collection.get("phases")
      .add(phase)
      .sync("create", phase,{
          //url: S.fixUrl(model.url()),
        headers: S.addAuthorizationHeader().headers,
        success: function(model, response) {
         console.log("savePhase")
              //Cerramos modal
            $('#dialog-crud').modal('hide')
            //Abrimos modal de success
            bootbox.alert({
              message:   "Phase saved",
              size:      'small',
              className: 'rubberBand animated'
            });

         let phaseView = new PhaseView();
             phaseView.render();

          },

          error: function(model, response) {
            console.log("error editPhase")
            console.log("status = "+model.status)
            console.log("response = "+model.responseText)

          }
    });       
      
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
