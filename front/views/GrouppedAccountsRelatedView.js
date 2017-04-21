'use strict'

let GrouppedAccountsRelatedView = Backbone.View.extend({
  tagName:"div",
  className: "col-md-6 col-md-offset-3",
  
  initialize: function(){
    this.navigation = new NavigationView();
    this.footer = new FooterView();    
  },
  


  render: function() {
    if (S.collection.get("related")!== undefined){
      let data = {
        related: S.collection.get("related").toJSON() 
      };
              
      let template = $("#grouppedaccount-related").html();
      let compiled = Handlebars.compile(template);
      this.$el.html(compiled(data));
      $("#relateaccount").html(this.$el);   
      return this;      
    }
    
  }
});