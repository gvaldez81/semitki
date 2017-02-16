'use strict'

let Semitki = {

  initialize: function() {
    // Initialize
    Backbone.history.start();
    this.router = new SemitkiRouter();
    this.jwtheader = "Authorization: JWT ";
    this.jwtoken = undefined;
    /* let posts = new Posts; // Collection first
    loginView = new SchedulerCreate({collection: posts});
    posts.fetch();
    */
  },

  sessionDestroy: () => {
    Semitki.jwtoken = undefined;
    Semitki.user.clear();
    Semitki.router.index();
  }
};


$(window).on('load', () => {

  Semitki.initialize();
  if(Semitki.jwtoken == undefined) {
    Semitki.router.index();
  } else {
    Semitki.router.dashboard();
  }
});
