'use strict'

let OrganizationView = Backbone.View.extend({

  className: "row",

  initialize: function() {
    this.template = S.handlebarsCompile("#resource-template");
    this.on('ready', S.fetchCollections);
    S.collection.get('campaigns').on('update', this.post_render);
    this.tour = S.tour('OrganizationView');
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
    let dialog = new addOrganizationView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new editOrganizationView({
      item: new Array(S.collection.get("organizations").get(id).toJSON())
    });
    dialog.render();
  },

  hideItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new hideOrganizationView({
      item: new Array(S.collection.get("organizations").get(id).toJSON())
    });
    dialog.render();
  },

  render: function(){
    let data = {
      title: S.polyglot.t('organization.title'),
      items: S.collection.get("organizations").toJSON()
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
