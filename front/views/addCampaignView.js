'use strict'

let addCampaignView = Backbone.View.extend({
  tagName: "div",

  className: "modal-dialog",

    initialize: function(data) {

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

  },

});