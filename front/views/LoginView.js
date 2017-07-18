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
            S.logger("bg-success", "Access granted, creating user. Please wait... ", true);
            S.jwtoken(result.token);
            S.fetchCollections();
            window.setTimeout(() => {
              if (S.jwtoken() != undefined && S.user != undefined) {
                let csrftoken = Cookies.get("csrftoken");
                let sysuser = S.collection.get("user").findWhere({
                  bucket_id: user.bucket_id
                });
                if (sysuser !== undefined) {
                  S.user.set(user);
                  sysuser.set(S.user.toJSON());
                  sessionStorage.setItem("user", JSON.stringify(user));
                  S.router.navigate('#scheduler', {trigger: true});
                } else {
                  S.logger("bg-danger",
                    "Couldn't associate Facebook user with system user",
                    true);
                }
              }},
              3000);
          }, (err) => { // The promise of FB token failed
            S.logger("bg-danger", "Failed login with Facebook account", true);
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
            tw_token.then((result) => { // The promise of the FB token succeded
              S.logger("bg-success", "Access granted, creating user. Please wait... ", true);
              S.jwtoken(result.token);
              S.fetchCollections();
              window.setTimeout(() => {
                if (S.jwtoken() != undefined && S.user != undefined) {
                  let csrftoken = Cookies.get("csrftoken");
                  let sysuser = S.collection.get("user").findWhere({
                    bucket_id: Cookies('tw_bucket_id')
                  });
                  if (sysuser !== undefined) {
                    document.cookie = 'tw_access_token=;'+expires
                    document.cookie = 'tw_access_token_secret=;'+expires
                    document.cookie = 'tw_bucket_id=;'+expires
                    S.user.set(sysuser.toJSON());
                    sessionStorage.setItem("user", JSON.stringify(sysuser.toJSON()));
                    S.router.navigate('#scheduler', {trigger: true});
                  } else {
                    S.logger("bg-danger",
                      "Couldn't associate Twitter user with system user",
                      true);
                  }
                }},
                3000);
            }, (err) => { // The promise of FB token failed
              S.logger("bg-danger", "Failed login with Twitter account", true);
            });
          }else{
            document.cookie = 'tw_denied=;'+expires
            S.logger("bg-danger", "Access to Twitter account info denied", true);
          }
        }
    });
  },


  tryLogin: () => {
    this.username = $("input[name='username']").val();
    this.password = $("input[name='password']").val();
    let url = S.api("auth/login");
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
          S.router.navigate("#scheduler", {trigger: true});
          S.fetchCollections();
       },
       error: (jqXHR, textStatus, errorTrhown) => {
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorTrhown);
         S.logger("bg-danger", "Failed login, check your credentials", true);
       }
      });
  },

  render: function() {
    let template = $("#login-template").html();
    let compiled = Handlebars.compile(template);

    this.footer.render();

    this.$el.html(compiled);
    $("#main").html(this.$el);

    return this;
  },

});
