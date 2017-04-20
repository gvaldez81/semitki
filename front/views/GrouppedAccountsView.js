'use strict'

let GrouppedAccountsView = Backbone.View.extend({
  tagName:"div",
  className: "row",
  
  events: {
    "draggable #relateaccount": "draggable",
  },

draggable: () =>{
  
},

  render: function(){
   let data = {
      groups: S.collection.get("groups").toJSON()
    }
    
    let template = $("#groupped-account").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(data));
    $("#container").html(this.$el);   
   
    
    return this;
  }
});