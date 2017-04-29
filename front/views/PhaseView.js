'use strict'

let PhaseView = Backbone.View.extend({

  tagName: "div",


  className: "row",


  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal = new editPhaseView();
    this.modal_add = new addPhaseView();
  },


  events: {
       
    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .add_phase": "addItem"
  },

  addItem: () => {
    let dialog = new addPhaseView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editPhaseView({item: new Array(S.collection.get("phases").get(id).toJSON())});
    dialog.render();
  },
/*
  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideCampaign({item: new Array(S.collection.get("phase").get(id).toJSON())});
    dialog.render();
    //return false;
  },

  delete: () => {
    let phases = S.collection.get("phase");
    let phase = phases.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
    //recargar el listado.
  },
*/
  render: function(){
    this.modal.render();
    this.modal_add.render();
    let data = {
      phase: S.collection.get("phases").toJSON()
    };

    let template = $("#phase-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    S.showButtons();
    return this;
  }
});
