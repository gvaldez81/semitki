'use strict'

let LandingPageView = Backbone.View.extend({

  tagName: "div",

  className: "row",


  events: {
    "click #landing-login-fb": "fbLogin",
    "click #landing-login-tw": "twLogin"
  },


  initialize: function() {
    S.sessionDestroy();
  },


  fbLogin: (e) => {
    let api_port = undefined;
    SEMITKI_CONFIG.api_port == ""  ? (

        api_port = ""

      ):(

        api_port = ":"+SEMITKI_CONFIG.api_port

    );

    e.preventDefault(); // Keep default action of button from beign triggered
    location.assign("https://www.facebook.com/v"+SEMITKI_CONFIG.fb_api
      +"/dialog/oauth?client_id="+SEMITKI_CONFIG.fb_app_id
      + "&redirect_uri=http://"+SEMITKI_CONFIG.api_url
      + api_port
      + "/callback/?chan=facebook"
      + "&scope=public_profile,email,publish_actions"
    );
  },

  twLogin: (e) => {
    e.preventDefault(); // Keep default action of button from beign triggered
    location.assign("http://"+SEMITKI_CONFIG.api_url
      + ":"+SEMITKI_CONFIG.api_port
      + "/twitter_auth/?action=request_token"
    );
  },

  render: function() {
    let template = $("#landing-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("body").html(this.$el);
    return this;
  }
});
