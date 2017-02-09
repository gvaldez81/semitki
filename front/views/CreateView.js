'use strict'

let CreateView = Backbone.View.extend({
    tagName:"div",
    className:"panel",
    
//Create
  render: function() {
    let template = $("#create").html();
    let compiled = _.template(template, { name: "create"});
    $(this.el).html(compiled);
    $("#container").html(this.el);
}
    
});
