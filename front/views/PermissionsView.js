'use strict'

let PermissionsView = Backbone.View.extend({
    tagName: "div",
    className: "row",
    
render: function(){
    let template = $("#permissions").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);        
  }
});