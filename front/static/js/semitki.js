'use strict'


let Semitki = {

  initialize: function() {
    // Initialize
    // Select boxes default settings
    $.fn.select2.defaults.set("theme", "bootstrap");
    $.fn.select2.defaults.set("allowClear", true);
    $.fn.select2.defaults.set("placeholder", "search...");
    Backbone.history.start();
    let navTemplate = Handlebars.compile($("#navigation").html())
    Handlebars.registerPartial('navigation', navTemplate);
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
    this.collection.set("userinfo", new UserInfo());
  },

  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': Semitki.jwtheader.concat(Semitki.jwtoken)}
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
    for (let [key, value] of Semitki.collection) {
      value.fetch(Semitki.addAuthorizationHeader());
    }
  },

  fbStatusChangeCallback: (response) => {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      Semitki.fb_token = response.authResponse.accessToken;
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
      Semitki.fbStatusChangeCallback(response);
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

    Semitki.jwtoken = undefined;
    Semitki.user.clear();
    Semitki.router.index();
  },

  user: new UserModel

};

// Launch the JavaScript client side app
$(() => {

  Semitki.initialize();
  // Check for a valid JWToken and route the user accordingly
  // TODO this is very weak, we need a solid authorization mechanism
  if(Semitki.jwtoken == undefined) {
    Semitki.router.index();
  } else {
    Semitki.router.dashboard();
  }

});
