'use strict'

let AboutView = Backbone.View.extend({
    tagName:"div",
    className:"row",
    
render: function(){
    let template = $("#about").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});