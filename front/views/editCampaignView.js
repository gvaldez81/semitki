'use strict'

let editCampaignView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

  initialize: function(data) {
    if (data == undefined){
      this.data = undefined;  
    }else{
      this.data = data;
      //TOUR
      let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "editCampaignView"})

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
    "click #edit": "editcampaign"
  },

   editcampaign: function (e){

    e.preventDefault();
    let id = $("#edit-id").val();
    let dialog = new editCampaignView({title: new Array(S.collection.get("campaigns").get(id).toJSON())});
    let model = S.collection.get("campaigns").get(id);
        model.set({name: $("#input_name_edit").val(),
        description: $("#input_description").val(),});

    let options = {

      error: (error) => {
        
        $('#dialog-crud').modal('hide');
        S.logger("bg-danger", "Couldn't Campaign Edit", true);

      },

      success: (model, reponse) => {

        $('#dialog-crud').modal('hide');       
        let campaignView = new CampaignView();
        campaignView.render(); 
        S.logger("bg-success", "Edit Campaign Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers,
        url: S.fixUrl(model.url()) 
        
    }

    let group = S.collection.get("campaigns");
    S.collection.get("campaigns").add(model)
        .sync("update", model, options);
  },

  render: function(){

    let template = $("#campaign-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if (this.tour != undefined){
          this.tour.start(true);
    }

    
  }

});