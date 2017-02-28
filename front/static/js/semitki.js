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
    this.collection.set("abouts", new Abouts());

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
