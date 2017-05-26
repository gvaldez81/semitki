'use strict'

let LandingPageView = Backbone.View.extend({

  tagName: "div",

  className: "row",


  events: {
    "click #landing-login-fb": "fbLogin",
    "click #landing-login-tw": "twLogin"
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
      + "&redirect_uri=http://"+SEMITKI_CONFIG.api_url
      + ":"+SEMITKI_CONFIG.api_port
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
    /*
    var head = $('head')
    head.append('<meta name="twitter:card" content="summary_large_image">')
    head.append('<meta name="twitter:site" content="@MexicoEligeBien">')
    head.append('<meta name="twitter:creator" content="@SirGerri">')
    head.append('<meta name="twitter:title" content="Mexico, es momento de elegir, #ElegirBien">')
    head.append('<meta name="twitter:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu finibus metus, ut eleifend odio. Praesent a ligula bibendum ex pulvinar tempor.">')
    head.append('<meta property="og:image" content="http://mexicoeligebien.mx/img/background.png">')
    */

    let template = $("#landing-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("body").html(this.$el);
    return this;
  }
});
