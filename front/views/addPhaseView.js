'use strict'

let addPhaseView = Backbone.View.extend({

  tagName: "div",
  className: "modal-dialog",

    initialize: function(data) {

    this.data = data || undefined;
    
  },

  events: {
    "click #save": "savephase",
  },

  savephase: function(e) { 

    e.preventDefault();
    let options = {

      error: (error) => {

        $('#dialog-crud').modal('hide');     
        S.logger("bg-danger", "Couldn't Phase Save", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let phaseView = new PhaseView();
        phaseView.render(); 
        S.logger("bg-success", "Save Phase Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers

    }

    let group = S.collection.get("phases")
        .create(this.addphase(), options);

  },

  addphase:() =>{

    let phase = {
      name: $("#input_name").val(),
      description: $("#input_description").val(),
      campaign: $("#campaign").val()

    };

    let phaseModel = new Phase(phase); 
    return phaseModel;

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