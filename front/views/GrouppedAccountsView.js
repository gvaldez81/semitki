'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName: "div",
  className: "row",

  initialize: function () {
    this.navigation = new NavigationView();   
    this.footer = new FooterView();
     this.relateda = new GrouppedAccountsRelatedView();
    this.navigation.render();
    this.footer.render();
 
  },


  events: {
    "change #group": "filteraccount"
  },


  filteraccount:() =>{

    S.collection.get("groups").filtering($('#group').val())
    let view = new GrouppedAccountsRelatedView();
    view.render();
  },

  render: function () {


    let data = {
      groups: S.collection.get("groups").toJSON(),
      account_groups: S.collection.get("account_groups").toJSON(),
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
