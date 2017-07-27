'use strict'

let UserView = Backbone.View.extend({
  tagName:"div",
  className:"row",

  initialize: function () {
    this.template = S.handlebarsCompile("#resource-template");
    this.tour = S.tour('UserView');
  },


  events: {
    "click .item_button_edit": "editItem",
    "click .item_button_remove": "hideItem",
    "click .btn-add": "addItem"
  },

  addItem: () =>{
    let dialog = new addUserView();
    dialog.render();
  },

  editItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new editUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },

  hideItem: function(ev) {
    let id = ev.target.parentElement.className;
    let dialog = new hideUserView({item: new Array(S.collection.get("user").get(id).toJSON())});
    dialog.render();
  },


  render: function() {
    let data = {
      title: S.polyglot.t('user.title'),
      items: S.collection.get("user").toJSON() //.where({is_superuser: false})
    };

    this.$el.html(this.template(data));
    $("#main").html(this.$el);

    S.showButtons();

    if (this.tour != undefined){
          this.tour.start(true);
    }

    return this;
  }
});
