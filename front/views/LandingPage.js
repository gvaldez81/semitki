'use strict'

let LandingPageView = Backbone.View.extend({

  tagName: "form",

  className: "form-signin",


  events: {
    "click #landing-login": "fbAuth"
  },


  initialize: function() {
    console.log(" aquipaso " );
    this.footer = new FooterView();
    S.toggleNavigation();
    S.sessionDestroy();
  },


  fbAuth: () => {
    console.log(SEMITKI_CONFIG.fb_app_id);
    location.assign("https://www.facebook.com/v2.9/dialog/oauth?client_id="
      + SEMITKI_CONFIG.fb_app_id
      + "&redirect_uri=http://localhost:8000/callback"
      + "&state=XyZ"
      + "&response_type=code%20token&scope=publish_actions");
  },


  render: function() {
    let template = $("#landing-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("#main").html(this.$el);
    return this;
  }
});
