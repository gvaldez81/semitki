'use strict'

let Semitki = {

  initialize: function() {
    // Initialize
    Backbone.history.start();
    this.router = new SemitkiRouter();
    this.jwtheader = "JWT ";
    this.jwtoken = undefined;
    this.projects = new Projects();
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


$(window).on('load', () => {

  Semitki.initialize();
  if(Semitki.jwtoken == undefined) {
    Semitki.router.index();
  } else {
    Semitki.router.dashboard();
  }
});
