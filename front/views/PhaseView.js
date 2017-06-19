'use strict'

let PhaseView = Backbone.View.extend({

  tagName: "div",
  className: "row",

  initialize: function() {
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal_edit = new editPhaseView();
    this.modal_add = new addPhaseView();
  },

  events: {

    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },

  addItem: () => {
    let dialog = new addPhaseView();
    dialog.render();
  },

  editItem: function(ev) {

    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editPhaseView({item: S.collection.get("phases").get(id).toJSON(),
                campaigns: S.collection.get("campaigns").toJSON()
    });
    dialog.render();
  },

  hideItem: function(ev) {

    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hidePhaseView({item: new Array(S.collection.get("phases").get(id).toJSON())});
    dialog.render();
  },

  delete: () => {
    let phases = S.collection.get("phases");
    //let phase = phases.get($("#campaignFinder").val());
    campaigns.sync("delete", phases, S.addAuthorizationHeader());
  },

  render: function(){
    this.modal_edit.render();
    this.modal_add.render();

      let data = {
        phase: S.collection.get("phases").toJSON(),

      };

      let template = $("#phase-template").html();
      let compiled = Handlebars.compile(template);
      this.$el.html(compiled(data));
      $("#main").html(this.$el);
      S.showButtons();
      return this;
  }
});
