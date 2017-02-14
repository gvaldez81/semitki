'use strict'

let Semitki = {

  initialize: function() {
    // Initialize
    Backbone.history.start();
    this.router = new SemitkiRouter();
    this.jwtoken = undefined;
    /* let posts = new Posts; // Collection first
    loginView = new SchedulerCreate({collection: posts});
    posts.fetch();
    */
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
