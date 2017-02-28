'use strict'

let LoginView = Backbone.View.extend({
  tagName: "div",
  className: "panel panel-info",
  events: {
    "click #login-button": "tryLogin",
    "click #fb-login": "tryFbLogin"
  },

  tryFbLogin: () => {
    FB.login((response) => {
      if(Semitki.fbStatusChangeCallback(response)) {
        Semitki.authReponse = response.authReponse;
        Semitki.router.navigate('#dashboard', {trigger: true});
      } else {
      }
    });
  },

  tryLogin: () => {
    let $form = $('#login-form');
    this.username = $form.find("input[name='username']").val();
    this.password = $form.find("input[name='password']").val();
    let url = apiBuilder("login")
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
          for (let [key, value] of Semitki.collection) {
            value.fetch(Semitki.addAuthorizationHeader());
          }

  $('#logout').on('click', function() {
    $('#logout').preventDefault();
    Semitki.sessionDestroy();
  });
        }
     });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
  },

});

