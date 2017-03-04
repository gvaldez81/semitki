'use strict'


let Semitki = {

  initialize: function() {
    // Initialize
    Backbone.history.start();
    let navTemplate = Handlebars.compile($("#navigation").html())
    Handlebars.registerPartial('navigation', navTemplate);
    this.router = new SemitkiRouter();
    this.jwtheader = "JWT ";
    this.jwtoken = undefined;
    // BackBone collection instances
    // Heil ES6 Map!
    this.collection = new Map ();
    this.collection.set("projects", new Projects());
    this.collection.set("topics", new Topics());
    this.collection.set("buckets", new Buckets());
    this.collection.set("campaigns", new Campaigns());
    this.collection.set("accounts", new Accounts());
    this.collection.set("groups", new Groups());
    this.collection.set("abouts", new Abouts()); // TODO refactor to Pages
  },

  sessionDestroy: () => {
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

  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': Semitki.jwtheader.concat(Semitki.jwtoken)}
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

  user: new UserModel

};

// Launch the JavaScript client side app
$(() => {

  Semitki.initialize();
  // Check for a valid JWToken and route the user accordingly
  if(Semitki.jwtoken == undefined) {
    Semitki.router.index();
  } else {
    Semitki.router.dashboard();
  }

});
