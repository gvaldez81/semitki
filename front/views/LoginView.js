'use strict'

let LoginView = Backbone.View.extend({
  tagName: "div",
  className: "panel panel-info",
  events: {
    "click #login-button": "tryLogin"
  },

  tryLogin: () => {
    let $form = $('#login-form');
    this.username = $form.find("input[name='username']").val();
    this.password = $form.find("input[name='password']").val();
    //this.model.bind("validated", this.validated) TODO code validated
    let url = $form.attr("action");
    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
       {
         beforeSend: (xhr, settings) => {
          if (!csrfSafeMethod(settings.type)
            && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        },
        data: {
          username: this.username,
          password: this.password
        },
        method: "POST",
        dataType: "JSON"
      }).done((data) => {
        Semitki.jwtoken = data.token;
        Semitki.user = new UserModel(data.user);
        if(Semitki.jwtoken != undefined && Semitki.user != undefined) {
            Semitki.router.navigate("#dashboard", {trigger: true});
        }
     });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
    //return this;
  },

});

