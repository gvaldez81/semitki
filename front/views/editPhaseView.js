'use strict'

let editPhaseView = Backbone.View.extend({

  tagName: "div",
  className: "modal-dialog",

  initialize: function(data) {
    if (data == undefined){
      this.data = undefined;  
    }else{
      this.data = data;
      //TOUR
      let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "editPhaseView"})

      if (tourFiltered.length>0){

         this.tour = new Tour({storage:false});
         this.tour.init();
        //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
        tourFiltered.sort(function(a,b) {
            return (a.title > b.title) 
                    ? 1 : ((b.title > a.title) 
            ? -1 : 0);} );
        
        let data = tourFiltered.map(element => {
              let salida  = {
                element: element.attributes.name,
                title :  element.attributes.title,
                content : element.attributes.content,  
              };
              //TODO Change for JS
              return $.extend(salida, element.attributes.options)
          });
        return this.tour.addSteps(data);
      }
    }

  },

  events: {
    "click #edit": "editphase"
  },

editphase: function (e){

    e.preventDefault();
    let id = $("#edit-id").val();
    let dialog = new editPhaseView({title: new Array(S.collection.get("phases").get(id).toJSON())});
    let model = S.collection.get("phases").get(id);
        model.set({name: $("#input_name").val(),
        description: $("#input_description").val(),
        campaign: $("#campaign").val()});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Phase Edit", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let phaseView = new PhaseView();
        phaseView.render(); 
        S.logger("bg-success", "Edit Phase Succesfully", true);

      },

      wait: true,
      headers: S.addAuthorizationHeader().headers,
      url: S.fixUrl(model.url()) 
        
    }

      let group = S.collection.get("phases");
      S.collection.get("phases").add(model)
          .sync("update", model, options);
  },

  render: function(){

    Handlebars.registerHelper('ifCond', function(v1, v2) {
      if(v1 === v2.campaign) {
        return "selected";
      }
      return null;
    });

    let template = $("#phase-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }

  },

});