'use strict'

let ProjectView = Backbone.View.extend({
    tagName: "div",
    className: "row",
    
render: function(){
    let template = $("#project").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);        
  }
});