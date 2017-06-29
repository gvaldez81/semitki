'use strict'

let hidePhaseView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

  initialize: function(data) {
    if (data == undefined){
      this.data = undefined;  
    }else{
      this.data = data;
      //TOUR
      let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "hidePhaseView"})

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
    "click #close": "close",
    "click #delete":  "hidephases"
  },

  close: function() {

    $('#dialog-crud').modal('hide')

  },

  hidephases: function (e){

    e.preventDefault();
    let id = $("#phase-id").val();
    let dialog = new hidePhaseView({title: new Array(S.collection.get("phases").get(id).toJSON())});
    //Update
    let model = S.collection.get("phases").get(id);
    model.set({'isactive': false});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Phase Delete", true);

      },

      success: (model, reponse) => {

        S.collection.get("phases").remove(model)
        $('#dialog-crud').modal('hide');       
        let phaseView = new PhaseView();
        phaseView.render(); 
        S.logger("bg-success", "Delete Phase Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url()) 
        
    }

        let campaign = S.collection.get("phases");
        S.collection.get("phases").add(model)
            .sync("update", model, options);

  },

  render: function(){
    
    let template = $("#phase-modal-hide").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }

  },

});