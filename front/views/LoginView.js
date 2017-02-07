'use strict'

let LoginView = Backbone.View.extend({

  events: {
    "click #login-button": "tryLogin"
  },

  tryLogin: () => {
//    $('#login-form').submit(function(event) {
//      event.preventDefault();
      let $form = $('#login-form');
      let u = $form.find("input[name='username']").val();
      let p = $form.find("input[name='password']").val();
      let url = $form.attr("action");
      let posting = $.post(url,
        {
          username: u,
          password: p
        });
      posting.done(function(data) {
        console.log(data);
      });
//    });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = _.template(template, { name: "Template Name" });
    $(this.el).html(compiled);
//    return this;
    $("#container").html(this.el);
  }

});
