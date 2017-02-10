'use strict'

let LoginView = Backbone.View.extend({
  tagName: "div",
  className: "panel panel-info",
  events: {
    "click #login-button": "tryLogin"
  },

  tryLogin: () => {
    let $form = $('#login-form');
    let u = $form.find("input[name='username']").val();
    let p = $form.find("input[name='password']").val();
    let url = $form.attr("action");
    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
       {
         beforeSend: (xhr, settings) => {
          if (!csrfSafeMethod(settings.type)
            && sameOrigin(settings.url)) {
            //xhr.setRequestHeader("HTTP_X_CSRFTOKEN", csrftoken);
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        },
        data: {
          username: u,
          password: p
        },
        method: "POST",
         dataType: "JSON"
      }).done((data) => {
        console.log(data)
      });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = _.template(template, { name: "Template Name" });
    this.$el.html(compiled);
    $("#container").html(this.$el);
  }

});

