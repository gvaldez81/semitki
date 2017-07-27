'use strict'

let GroupsView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {
    this.template = S.handlebarsCompile('#resource-template');
    this.tour = S.tour('GroupsView');
  },

  events: {
    "click .btn-add": "addItem",
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
  },

  addItem: () => {
    let dialog = new addGroupsView();
    dialog.render();
  },

  hideItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new hideGroupsView({item: new Array(S.collection.get("groups").get(id).toJSON())});
    dialog.render();
  },

  editItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new editGroupsView({item: new Array(S.collection.get("groups").get(id).toJSON())});
    dialog.render();
  },

  render: function() {

    let data = {
      title: S.polyglot.t('group.title'),
      items: S.collection.get("groups").toJSON()
    }

    this.$el.html(this.template(data));
    $("#main").html(this.$el);

    S.showButtons();

    if(this.tour != undefined){
        this.tour.start(true);
    }

    this.trigger('ready');
    return this;
  }

});
