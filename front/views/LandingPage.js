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


  fbLogin: (e) => {
    e.preventDefault(); // Keep default action of button from beign triggered
    location.assign("https://www.facebook.com/v"+SEMITKI_CONFIG.fb_api
      +"/dialog/oauth?client_id="+SEMITKI_CONFIG.fb_app_id
      + "&redirect_uri=http://localhost:8000/callback/"
      + "&scope=public_profile,email,publish_actions"
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
