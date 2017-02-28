'use strict'

let UserView = Backbone.View.extend({
    tagName:"div",
    className:"row",
    
render: function(){
    let template = $("#user").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }
});