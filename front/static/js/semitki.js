$(window).on('load', () => {

  // Initialize
  let posts = new Posts; // Collection first
  loginView = new SchedulerCreate({collection: posts});
  posts.fetch();
  let semitkiRouter = new SemtikiRouter();
  semitkiRouter();
//  loginView.render({ el: "#container" });
});
