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
        FB.api('/me', { "fields": "id,name,email"}, (response) => {
          let user = {
            fb_userID: response.id,
            name: response.name,
            email: response.email
          };
          $.ajax(Semitki.api("api/login/social/jwt_user"),
            {
              data: {
                "provider": "facebook",
                "code": SEMITKI_CONFIG.fb_app_id
              },
              method: "POST",
            }).done((response) => {
              Semitki.jwtoken = response.access_token;
          Semitki.user.set(user);
          Semitki.router.navigate('#dashboard', {trigger: true});
          Semitki.fetchCollections();
            });
        });
      } else {
        // TODO when user not logged in FB do something perhaps
        console.log("no in Fb");
      }
    }, {scope: 'email'});
  },

  tryLogin: () => {
    let $form = $('#login-form');
    this.username = $form.find("input[name='username']").val();
    this.password = $form.find("input[name='password']").val();
    let url = apiBuilder("api-token-auth")
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
        Semitki.user.set(data.user);
        if(Semitki.jwtoken != undefined && Semitki.user != undefined) {
          Semitki.router.navigate("#dashboard", {trigger: true});
          Semitki.fetchCollections();
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

