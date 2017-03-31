'use strict'

let LoginView = Backbone.View.extend({

  tagName: "div",

  className: "panel panel-info",

  events: {
    "click #login-button": "tryLogin",
    "click #fb-login": "tryFbLogin",
    "click #recover-pass": "recoverPassword",
  },

  recoverPassword: () => {
    let url = apiBuilder("auth/password/reset")
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
        email: $("#email").val()
      },
      method: "POST",
      dataType: "JSON"
    });
  },

  tryFbLogin: () => {
    FB.login((response) => {
      if(S.fbStatusChangeCallback(response)) {
        FB.api('/me', { "fields": "id,name,email"}, (response) => {
          let user = {
            fb_userID: response.id,
            name: response.name,
            email: response.email
          };
          $.ajax(S.api("auth/facebook"),
            {
              data: {
                "access_token": S.fb_token
              },
              method: "POST",
            }).done((response) => {
              S.jwtoken = response.access_token;
/*          S.user.set(user);*/
          /*S.router.navigate('#dashboard', {trigger: true});*/
          S.fetchCollections();
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
        S.jwtoken = data.token;
        S.user.set(data.user);
        if(S.jwtoken != undefined && S.user != undefined) {
          S.router.navigate("#dashboard", {trigger: true});
          S.fetchCollections();
        }
     });
  },

  render: function() {
/*    let data = {*/
      //t: {
        //"use_other_account": S.polyglot.t("login.use_other_account")
      //}
    /*};*/
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#container").html(this.$el);
    return this;
  },

});

