'use strict'

let CampaignView = Backbone.View.extend({

  className: "row",

  initialize: function() {
    this.template = S.handlebarsCompile("#resource-template");
    this.on('ready', S.fetchCollections);
    S.collection.get('campaigns').on('update', this.post_render);
    this.tour = S.tour('CampaignView');
  },

  events: {
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },

  post_render: function() {
    console.log('doit');
  },

  addItem: () => {
    let dialog = new addCampaignView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new editCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  hideItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new hideCampaignView({
      item: new Array(S.collection.get("campaigns").get(id).toJSON())
    });
    dialog.render();
  },

  render: function(){
    let data = {
      title: S.polyglot.t('campaign.title'),
      items: S.collection.get("campaigns").toJSON()
    };

    this.$el.html(this.template(data));
    $("#main").html(this.$el);
    S.showButtons();

    if (this.tour != undefined){
      this.tour.start(true);
    }

    this.trigger('ready');
    return this;
  }
});
