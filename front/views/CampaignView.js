'use strict'

let CampaignView = Backbone.View.extend({

  tagName: "div",


  className: "row",


  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
  },


  events: {
    "click #save": "create",
    "click #edit": "edit",
    "click #delete": "delete"
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

  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
    //recargar el listado.
  },

  render: function(){
    let data = {
      campaigns: S.collection.get("campaigns").toJSON()
      //phases: S.collection.get("phases").toJSON();
    };

    this.navigation.render();
    this.footer.render();

    let template = $("#campaign-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);

    return this;
  }
});
