'use strict'


let S = {

  initialize: function() {
    // Initialize
    // Internationalization
    S.initPolyglot(this);
    // Select boxes default settings
    $.fn.select2.defaults.set("theme", "bootstrap");
    $.fn.select2.defaults.set("allowClear", true);
    $.fn.select2.defaults.set("placeholder", "search...");
    Backbone.history.start();
    let navTemplate = Handlebars.compile($("#navigation-template").html());
    let footerTemplate = Handlebars.compile($("#footer-template").html());
    Handlebars.registerPartial('navigation', navTemplate);
    Handlebars.registerPartial('footer', footerTemplate);
    this.router = new SemitkiRouter();
    //this.jwtheader = "Token ";
    this.jwtheader = "JWT ";
    this.jwtoken = undefined;
    // BackBone collection instances
    // Heil ES6 Map!
    this.collection = new Map ();
    // Collections == Catalogs
    this.collection.set("projects", new Projects());
    this.collection.set("topics", new Topics());
    this.collection.set("buckets", new Buckets());
    this.collection.set("accounts", new Accounts());
    this.collection.set("groups", new Groups());
    this.collection.set("posts", new Posts());
    this.user = new UserModel();
    this.users = new Users();
    this.static_pages = new StaticPages();
    this.static_pages.fetch(() => {
      return {
        headers: {'X-CSRFToken': Cookies.get("CSRFToken")}
      }
    });
  },


  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': S.jwtheader.concat(S.jwtoken)}
    }
  },


  api: (resource) => {
    // Builds the api url of a given resource
    if(SEMITKI_CONFIG.api_port == undefined) {
      return "//" + SEMITKI_CONFIG.api_url + "/" + resource + "/";
    } else {
      return "//" + SEMITKI_CONFIG.api_url + ":" + SEMITKI_CONFIG.api_port + "/" + resource + "/";
    }
  },


  fetchCollections: () => {
    for (let [key, value] of S.collection) {
      value.fetch(S.addAuthorizationHeader());
    }
  },


  fbStatusChangeCallback: (response) => {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      S.fb_token = response.authResponse.accessToken;
      return true;
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('loged in fb but not in app');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('loginto fb');
    }
  },


  fbGetLoginStatus: () => {
    FB.getLoginStatus((response) => {
      S.fbStatusChangeCallback(response);
    });
  },


  initPolyglot: (semitki) => {
    let phrases = $.get("i18n/en.json", {
      dataType: "json"
    });
    phrases.done((xhr) => {
      semitki.polyglot = new Polyglot({phrases: xhr});
      console.log(semitki.polyglot);
      //return polyglot;
    });
  },


  sessionDestroy: () => {
    // TODO Broken, it needs to be fixed for whatever we do the login work
    let url = apiBuilder("rest-auth/logout")
  //    let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
     {
        method: "POST",
        dataType: "JSON"
      }).done((data) => {
        console.log(data);
     });

    S.jwtoken = undefined;
    S.user.clear();
    S.router.index();
  },

};

// Launch the JavaScript client side app
$(() => {

  S.initialize();
  // Check for a valid JWToken and route the user accordingly
  // TODO this is very weak, we need a solid authorization mechanism
  if(S.jwtoken == undefined) {
    S.router.index();
  } else {
    S.router.dashboard();
  }

});
