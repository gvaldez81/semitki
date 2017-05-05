'use strict'

let LandingPageView = Backbone.View.extend({

  tagName: "div",

  className: "row",


  events: {
    "click #landing-login": "fbLogin"
  },


  initialize: function() {
    //this.footer = new FooterView();
    //S.toggleNavigation();
    S.sessionDestroy();
  },


  fbManualLogin: () => {
    location.assign("https://www.facebook.com/v2.9/dialog/oauth?client_id="
      + SEMITKI_CONFIG.fb_app_id
      + "&redirect_uri=http://localhost:8000/callback"
      + "&response_type=token"
      + "&scope=public_profile,email,publish_actions");
  },


  fbLogin: () => {
    FB.login((response) => {
      if(response.status === 'connected') {

        let data = {
            username: response.authResponse.userID, //TODO maybe better the name
            token_expiration: "2017-05-05T00:00",
            access_token: response.authResponse.accessToken,
            bucket: "facebook",
            isactive: true,
        };

        fb.api('/me', {'fields': 'id,name,email'}, (response) => {
          data.email = response.email

          let fbPromise = new Promise((resolve, reject) => {
            let url = apiBuilder("account");
            let csrftoken = Cookies.get("csrftoken");
            $.ajax(url, {
              beforeSend: (xhr, settings) => {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
              },
              data: data,
              method: "POST"
            }).done(resolve).fail(reject);
          });

          fbPromise.then((result) => {
            console.log(result);
          },
          (err) => {
            S.logger("bg-danger", "Failed to login with Facebook", true);
          });
        });

      } else {
        console.log('not login in fb');
      }
    }, {scope: 'public_profile,email,publish_actions'})
  },

  render: function() {
    let template = $("#landing-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("body").html(this.$el);
    return this;
  }
});
