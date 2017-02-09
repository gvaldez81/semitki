'use strict'

let SemitkiRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "scheduler": "scheduler"
  },
  index: function() {
    let view = new LoginView();
    view.render({el:"#container"});
  },
  scheduler: function() {
    let view = new SchedulerCreate();
    view.render({el:"#container"});
  }
});
