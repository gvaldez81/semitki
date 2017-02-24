'use strict'

let api_url = "127.0.0.1";
let api_port = 8000;

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
    this.collection.set("abouts", new Abouts());

  },

  api: (resource) => {
    if(api_port == undefined) {
      return "//" + api_url + "/" + resource + "/";
    } else {
      return "//" + api_url + ":" + api_port + "/" + resource + "/";
    }
  },

  sessionDestroy: () => {
    Semitki.jwtoken = undefined;
    Semitki.user.clear();
    Semitki.router.index();
  },

  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': Semitki.jwtheader.concat(Semitki.jwtoken)}
    }
  },


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
