'use strict'

let CampaignView = Backbone.View.extend({

  tagName: "div",


  className: "row",


  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal = new editCampaign();
  },


  events: {
    "click #save": "create",
    "click #edit": "edit",
    "click #delete": "delete",
    "click .item_button_edit": "editItem"
  },

  create: () => {

    //Ir a la vista detalle
  },

  edit: () => {
    //Obtener el ID de la campana seleccionada
    let data = {
      campaign_id: undefined
    };
    //Ir a la vista detalle cargando la campana seleccionada

  },


  editItem: function(ev) {
/*    let id = $(ev.currentTarget).parents('.item')[0].id;*/
    //let dialog = new editCampaign({item: S.collection.get("campaigns").get(id)});
    //dialog.render();
    /*return false;*/
    //$("#dialog").modal({show: true});
  },

  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
    //recargar el listado.
  },

  render: function(){
    this.modal.render();
    let data = {
      campaigns: S.collection.get("campaigns").toJSON()
      //phases: S.collection.get("phases").toJSON();
    };

    let template = $("#campaign-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    S.showButtons();
    return this;
  }
});
