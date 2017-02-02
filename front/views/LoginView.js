'use strict'

let LoginView = Backbone.View.extend({

  events: {
    "click #login-button": "tryLogin"
  },

  tryLogin: function() {

    if(this.$("#login-form-1").parsley('validate')) {
      console.log("Is valid!!");
    } else {
      console.log("Not valid :(");
    }
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = _.template(template, { name: "Template Name" });
    $(this.el).html(compiled);
//    return this;
    $("#container").html(this.el);
  }

});
