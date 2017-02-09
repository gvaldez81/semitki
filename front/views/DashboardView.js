'use strict'

let DashView = Backbone.View.extend({
    tagName:"div",
    className:"panel-body",
    
 //    events: {
//    "click #login-button": "tryLogin"
//  },
        //Dashboard
  render: function() {
    let template = $("#dashboard").html();
    let compiled = _.template(template, { name: "Dashboard"});
    $(this.el).html(compiled);
    $("#container").html(this.el);
}
    
});

