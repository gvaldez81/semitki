'use strict'

let Semitki = {

  initialize() {
    // Initialize
    console.log("I'm heating up")
    Backbone.history.start();
    this.router = new SemitkiRouter();
    this.jwtoken = 0;
    // TODO Get CSRF cookie here
/*    let posts = new Posts; // Collection first
    loginView = new SchedulerCreate({collection: posts});
    posts.fetch();
    let semitkiRouter = new SemtikiRouter();
    semitkiRouter();
    */
  },
};


$(window).on('load', () => {

  Semitki.initialize();
  if(Semitki.jwtoken == undefined) {
   Semitki.router.index();
  } else {
    Semitki.router.scheduler();
  }
});
