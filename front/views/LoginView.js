'use strict'

let LoginView = Backbone.View.extend({
  tagName: "div",
  className: "panel panel-info",
  events: {
    "click #login-button": "tryLogin"
  },

  tryLogin: function() {
//    $('#login-form').submit(function(event) {
//      event.preventDefault();
      let $form = $('#login-form');
      let u = $form.find("input[name='username']").val();
      let p = $form.find("input[name='password']").val();
      let url = $form.attr("action");
      let csrftoken = Cookies.get("csrftoken");
      let posting = $.ajax(url,
         {
           beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)
              && sameOrigin(settings.url)) {
              xhr.setRequestHeader("HTTP_X_CSRFTOKEN", csrftoken);
            }
          },
          data: {
            username: u,
            password: p
          },
          method: "POST"
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
