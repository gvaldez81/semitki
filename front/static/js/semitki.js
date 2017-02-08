$(window).on('load', function() {

  // Initialize
  let posts = new Posts; // Collection first
  loginView = new SchedulerCreate({collection: posts});
  posts.fetch();
  loginView.render({ el: "#container" });
