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



  saveCampaign:() =>{
    let data = {
      name: $("#input_name").val(),
      description: $("#input_description").val()
    };

    let campaign = new Campaign(data);
    S.collection.get("campaigns")
      .add(campaign)
      .sync("create", campaign, {
          headers: S.addAuthorizationHeader().headers,
          success: function(model, response) {
            console.log("saveCampaign")
            //Cerramos modal
            $('#dialog-crud').modal('hide')
            //Abrimos modal de success
            bootbox.alert({
              message: "Campaign saved",
              size: 'small',
              className: 'rubberBand animated'
            });

          let campaignView = new CampaignView();
              campaignView.render();
          },
          error: function(model, response) {
            console.log("error saveCampaing")
            console.log("status = "+model.status)
            console.log("response = "+model.responseText)

          }
    });
    
  },





  render: function(){
    let template = $("#campaign-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
