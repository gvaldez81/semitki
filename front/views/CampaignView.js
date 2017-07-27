'use strict'

let CampaignView = Backbone.View.extend({

  className: "row",

  initialize: function() {
    this.template = S.handlebarsCompile("#resource-template");
    this.modal_edit = new editCampaignView();
    this.modal_add = new addCampaignView();
    this.on('ready', S.fetchCollections);
    S.collection.get('campaigns').on('update', this.post_render);
  },

  events: {
    "click #save": "create",
    "click #edit": "edit",
    "click #delete": "delete",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },

  post_render: function() {
    this.modal_edit.render();
    this.modal_add.render();
  },

  addItem: () => {
    let dialog = new addCampaignView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new editCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  hideItem: function(ev) {
    let id = $(ev.currentTarget).parents('.item')[0].id;
    let dialog = new hideCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  delete: () => {
    let campaigns = S.collection.get("campaigns");
    let campaign = campaigns.get($("#campaignFinder").val());
    campaigns.sync("delete", campaign, S.addAuthorizationHeader());
  },

  render: function(){
    let data = {
      title: S.polyglot.t('campaign.title'),
      items: S.collection.get("campaigns").toJSON()
    };

    this.$el.html(this.template(data));
    $("#container").html(this.$el);
    $("#main").html(this.$el);
    S.showButtons();

    if (this.tour != undefined){
      this.tour.start(true);
    }

    this.trigger('ready');
    return this;
  }
});
