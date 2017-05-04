'use strict'

let LandingPageView = Backbone.View.extend({

  tagName: "div",

  className: "row",


  events: {
    "click #landing-login": "fbManualLogin"
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
      + "&state=XyZ"
      + "&scope=public_profile,email,publish_actions");
  },


  fbLogin: () => {
    FB.login((response) => {
      if(response.status === 'connected') {
        console.log(response);
        let url = apiBuilder("account");
        let csrftoken = Cookies.get("csrftoken");
        $.ajax(url, {
          beforeSend: (xhr, settings) => {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
          },
          data: {
            username: response.authResponse.userID,
            token_expiration: "2017-05-05T00:00",
            access_token: response.authResponse.accessToken,
            bucket: "facebook",
            valid_to: "2017-05-05",
            isactive: true,
            email: response.authResponse.userID
          },
          method: "POST"
        })
          .done((xhr) => {
            console.log(xhr);
          })
          .fail((xhr) => {
            console.log(xhr);
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
