'use strict'

let LoginView = Backbone.View.extend({

  tagName: "form",

  className: "form-signin",

  initialize: function() {
    this.template = S.handlebarsCompile("#login-template");
  },

  events: {
    "click #login-button": "tryLogin",
    "click #fb-login": "tryFbLogin",
    "click #twitter-login": "tryTwLogin",
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
          fb_token.then((result) => { // The promise of the FB token succeded
            S.jwtoken(result.token);
            if (S.jwtoken() != undefined && S.user != undefined) {
              let csrftoken = Cookies.get("csrftoken");
              S.user.set(user);
              sessionStorage.setItem("user", JSON.stringify(user));
              S.view.get('scheduler').render();
            }
          }, (err) => { // The promise of FB token failed
            S.logger("bg-danger", "login.fbfail");
          });
        });
      }
    }, {scope: 'public_profile,email,publish_actions,user_photos,' +
      'manage_pages,publish_pages'});
  },


  tryTwLogin: () => {
    $.oauthpopup({
        path: S.api("auth/tw_request_token"),
        callback: function(param)
        {
          let d = new Date();
          d.setDate(d.getDate() - 1);
          let expires = ";expires="+d;

          if (Cookies('tw_denied') == undefined){

            let tw_token = new Promise((resolve, reject) => {
              $.ajax(S.api("auth/twitter"),{
              data: {
                  "access_token": Cookies('tw_access_token'),
                  "token_secret": Cookies('tw_access_token_secret'),
              },
              method: "POST",
              }).done(resolve).fail(reject);
            });
            tw_token.then((result) => { // The promise of the TW token succeded
              S.jwtoken(result.token);
              if (S.jwtoken() != undefined && S.user != undefined) {
                let csrftoken = Cookies.get("csrftoken");
                document.cookie = 'tw_access_token=;'+expires
                document.cookie = 'tw_access_token_secret=;'+expires
                document.cookie = 'tw_bucket_id=;'+expires
                S.view.get('scheduler').render();
              }
            }, (err) => { // The promise of TW token failed
              S.logger("bg-danger", "login.twfail");
            });
          } else {
            document.cookie = 'tw_denied=;'+expires
            S.logger("bg-danger", "twitter.infodenied");
          }
        }
    });
  },


  tryLogin: () => {
    this.username = $("input[name='username']").val();
    this.password = $("input[name='password']").val();
    let url = apiBuilder("auth/login");
    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
       {
         beforeSend: (xhr, settings) => {
          if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          }
        },
        data: {
          username: this.username,
          password: this.password
        },
        method: "POST",
        dataType: "JSON",
        success: (data) => {
          S.jwtoken(data.token);
          S.user.set(data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          S.view.get('scheduler').render();
       },
       error: (jqXHR, textStatus, errorTrhown) => {
         S.logger("bg-danger", "login.fail");
       }
    });
  },

  render: function() {
    this.$el.html(this.template);
    $("#main").html(this.$el);
//    S.view.get('footer').render();
    return this;
  },

});
