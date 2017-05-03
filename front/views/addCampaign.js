'use strict'

let addCampaign = Backbone.View.extend({
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
      .sync("create", campaign, S.addAuthorizationHeader());
    console.log("saveCampaign")
    //Cerramos modal
    $('#dialog-crud').modal('hide')
    //Abrimos modal de success
    bootbox.alert({
      message: "Campaign saved",
      size: 'small',
      className: 'rubberBand animated'
    });
  },





  render: function(){
    let template = $("#campaign-modal-add").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-crud").html(this.$el);
  },


});
