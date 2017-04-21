'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName:"div",
  className: "row",
  
  initialize: function(){
    this.navigation = new NavigationView();
    this.relatedaccount = new GrouppedAccountsRelatedView();
    this.footer = new FooterView();    
  },
  
  events: {
    "change #groups": "filterGroup",
  },

  filterGroup: () =>{
    S.collection.get("account_groups").filtering($('#groups').val())
    let view = new GrouppedAccountsRelatedView();
    view.render();
  },

  render: function() {
    
  let data = {
    groups: S.collection.get("groups").toJSON(),
    account_groups: S.collection.get("account_groups").toJSON(),
    accounts: S.collection.get("accounts").toJSON()  

  };
            
  let template = $("#groupped-account").html();
  let compiled = Handlebars.compile(template);
  this.$el.html(compiled(data));
  $("#main").html(this.$el);  
  this.relatedaccount.render();

  return this;    
  }
});