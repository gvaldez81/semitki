'use strict'

let CampaignView = Backbone.View.extend({

  tagName: "div",


  className: "row",


  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal = new editCampaignView();
    this.modal_add = new addCampaignView();
  },


  events: {
    "click #save": "create",
    "click #edit": "edit",
    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .add_campaign": "addItem"
  },

  addItem: () => {
    let dialog = new addCampaignView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editCampaignView({item: new Array(S.collection.get("campaigns").get(id).toJSON())});
    dialog.render();
    //return false;
  },

  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideCampaignView({item: new Array(S.collection.get("campaigns").get(id).toJSON())});
    dialog.render();
    //return false;
  },

  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
    //recargar el listado.
  },

  render: function(){
    //this.modal.render();
    this.modal_add.render();
    let data = {
      campaigns: S.collection.get("campaigns").toJSON()
      //phases: S.collection.get("phases").toJSON();
    };

    let template = $("#campaign-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    $("#main").html(this.$el);
    S.showButtons();
    return this;
  }
});
