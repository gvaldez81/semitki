'use strict'

let Semitki = {

  initialize: function() {
    // Initialize
    Backbone.history.start();
    this.router = new SemitkiRouter();
    this.jwtheader = "JWT ";
    this.jwtoken = undefined;
    // BackBone collection instances
    this.collection = {
      "projects": new Projects(),
      "topics": new Topics()
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
