'use strict'

let Semitki = {

  initialize() {
    // Initialize
    console.log("I'm heating up")
    Backbone.history.start();
    this.router = new SemitkiRouter();
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
  Semitki.router.navigate("scheduler", {trigger: true});

//  loginView.render({ el: "#container" });
});
