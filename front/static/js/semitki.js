$(window).on('load', () => {

  // Initialize
  let posts = new Posts; // Collection first
  loginView = new SchedulerView({collection: posts});
//  posts.fetch();
//  let semitkiRouter = new SemtikiRouter();
//  semitkiRouter();
 loginView.render({ el: "#container" });
});