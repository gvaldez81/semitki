'use strict'

let GrouppedARView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();
    this.relateda = new GrouppedAView();
    this.footer = new FooterView();
  },


  events: {
    "change #groupName": "filteraccount"
  },


  filteraccount:() =>{

    S.collection.get("groups").filtera($('#groups').val())
    let view = new GrouppedAView();
    view.render();
  },

  render: function () {


    let data = {
      groups: S.collection.get("groups").toJSON(),
      account_g: S.collection.get("account_groups").toJSON(),
      accounts: S.collection.get("accounts").toJSON()
    };


    let template = $("#groupped-art").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#main").html(this.$el);
    this.relateda.render();

    return this;
  }
});
