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
      + "&redirect_uri=http://"+SEMITKI_CONFIG.api_url
      + ":"+SEMITKI_CONFIG.api_port
      + "/callback/?chan=facebook"
      + "&scope=public_profile,email,publish_actions"
    );
  },


  render: function() {
    var head = $('head')
    head.append('<meta name="twitter:card" content="summary_large_image">')
    head.append('<meta name="twitter:site" content="@SirGerri">')
    head.append('<meta name="twitter:creator" content="@MexicoEligeBien">')
    head.append('<meta name="twitter:title" content="Mexico, es momento de elegir, #ElegirBien">')
    head.append('<meta name="twitter:description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu finibus metus, ut eleifend odio. Praesent a ligula bibendum ex pulvinar tempor.">')
    head.append('<meta name="twitter:image" content="http://159.203.134.236:9080/img/background.png">')


    let template = $("#landing-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);
    $("body").html(this.$el);
    return this;
  }
});
