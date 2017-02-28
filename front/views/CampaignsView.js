'user strict'

let CampaignsView = Backbone.View.extend({
    tagName:"div",
    className:"row",
    
render: function(){
    let template = $("#campaigns").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  } 
});