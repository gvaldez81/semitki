'use strict'

let PhaseView = Backbone.View.extend({

  tagName: "div",
  className: "row",

  initialize: function() {
    this.template = S.handlebarsCompile("#resource-template");
    this.on('ready', S.fetchCollections);
    S.collection.get('phases').on('update', this.post_render);
    this.tour = S.tour('PhaseView');
  },

  events: {
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },


  post_render: function() {
    console.log('post');
  },

  addItem: () => {
    let dialog = new addPhaseView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new editPhaseView({item: S.collection.get("phases").get(id).toJSON(),
                campaigns: S.collection.get("campaigns").toJSON()
    });
    dialog.render();
  },

  hideItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new hidePhaseView({item: new Array(S.collection.get("phases").get(id).toJSON())});
    dialog.render();
  },

  render: function(){
    let data = {
      title: S.polyglot.t('phase.title'),
      items: S.collection.get("phases").toJSON(),
    };

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
