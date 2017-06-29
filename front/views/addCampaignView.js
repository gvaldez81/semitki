'use strict'

let addCampaignView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

    initialize: function(data) {

      let tourFiltered = S.collection.get("tour_element").filter(
        function(obj){ return obj.attributes.view == "addCampaignView"})
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

      this.data = data || undefined;

  },

  events: {
    "click #save": "saveCampaign"
  },

  saveCampaign: function(e) { 

    e.preventDefault();
    let options = {

      error: (error) => {

        $('#dialog-crud').modal('hide');       
        S.logger("bg-danger", "Couldn't Campaign Save", true);

      },

      success: (model, reponse) => {

        console.log(model);
        $('#dialog-crud').modal('hide');       
        let campaignView = new CampaignView();
        campaignView.render();   
        S.logger("bg-success", "Save Campaign Succesfully", true);

      },

        wait: true,
        headers: S.addAuthorizationHeader().headers 

    }

    let campaign = S.collection.get("campaigns")
        .create(this.addCampaign(), options);
        console.log("Campaign");

  },

  addCampaign: function(){

    let campaigns = {
      name: $("#input_name").val(),
      description: $("#input_description").val()
    };

    let campaignModel = new Campaign(campaigns); 
    return campaignModel;

  },

  render: function(){

    let template = $("#campaign-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);

    if(this.tour != undefined){
        this.tour.start(true);
    }
  },

});