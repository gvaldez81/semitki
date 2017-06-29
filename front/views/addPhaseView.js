'use strict'

let addPhaseView = Backbone.View.extend({

  tagName: "div",
  className: "modal-dialog",

    initialize: function(data) {

      let tourFiltered = S.collection.get("tour_element").filter(
        function(obj){ return obj.attributes.view == "addPhaseView"})
      if (tourFiltered.length>0){
        this.tour = new Tour({storage:false});
        this.tour.init();
        //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
        tourFiltered.sort(function(a,b) {
            return (a.title > b.title) 
                    ? 1 : ((b.title > a.title) 
            ? -1 : 0);} );
        
        let elementtour = tourFiltered.map(element => {
              let salida  = {
                element: element.attributes.name,
                title :  element.attributes.title,
                content : element.attributes.content,  
              };
              //TODO Change for JS
              return $.extend(salida, element.attributes.options)
          });
        return this.tour.addSteps(elementtour);
      }      

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
        S.logger("bg-danger", S.polyglot.t("phase.create_error"));

      },

      success: (model, reponse) => {

        console.log(model);
        $('#dialog-crud').modal('hide');
        let phaseView = new PhaseView();
        phaseView.render();
        S.logger("bg-success", S.polyglot.t("phase.create_success"));

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers

    }

    let group = S.collection.get("phases")
        .create(this.addphase(), options);
        console.log("Phase");

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

    if(this.tour != undefined){
        this.tour.start(true);
    }
  },

});
