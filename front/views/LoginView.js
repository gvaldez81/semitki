'use strict'

let LoginView = Backbone.View.extend({

  tagName: "form",

  className: "form-signin",


  initialize: function() {
    this.footer = new FooterView();
    S.toggleNavigation();
  },

  events: {
    "click #login-button": "tryLogin",
    "click #fb-login": "tryFbLogin",
    "click #tw-login": "tryTwLogin",
    "click #recover-pass": "recoverPassword",
  },

  recoverPassword: () => {
    // TODO IT does not work, needs some work in backend
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


  tryFbLogin: function() {
    FB.login((response) => {
      if(S.fbStatusChangeCallback(response)) {
        FB.api('/me', { "fields": "id,name,email"}, (response) => {
          let user = {
            user: response.id,
            bucket_id: response.id,
            bucket: "facebook",
            username: response.name,
            last_name: response.name.split(" ")[0],
            first_name: response.name.split(" ")[1],
            email: response.email,
            is_staff: true
          };

          let fb_token = new Promise((resolve, reject) => {
            $.ajax(S.api("auth/facebook"),
            {
              data: {
                "access_token": S.fbtoken(),
              },
              method: "POST",
            }).done(resolve).fail(reject);
          });

          fb_token.then((result) => {
            S.jwtoken(result.token);
            if (S.jwtoken() != undefined && S.user != undefined) {
              S.user.set(user);
              sessionStorage.setItem("user", JSON.stringify(user));
              S.router.navigate('#scheduler', {trigger: true});
              S.fetchCollections();
            }
          }, (err) => {
            S.logger("bg-danger", "Failed login with Facebook account", true);
          });
        });
      }
    }, {scope: 'public_profile,email,publish_actions,user_photos'});
  },


  tryTwLogin: () => {
    S.logger("bg-danger", "Login with Twitter TODO", true);
  },


  tryLogin: () => {
    this.username = $("input[name='username']").val();
    this.password = $("input[name='password']").val();
    let url = apiBuilder("auth/login")
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
        S.jwtoken(data.token);
        S.user.set(data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        S.router.navigate("#scheduler", {trigger: true});
        S.fetchCollections();
     }).fail((xhr) => {
       S.logger("bg-danger", "Failed login, check your credentials", true);
     });
  },

  render: function() {
/*    let data = {*/
      //t: {
        //"use_other_account": S.polyglot.t("login.use_other_account")
      //}
/*    }*/;
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);

    this.footer.render();

    this.$el.html(compiled);
    $("#main").html(this.$el);

    return this;
  },

});

