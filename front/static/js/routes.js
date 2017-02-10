'use strict'

let SemitkiRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "scheduler": "scheduler"
  },
  index: () => {
    let view = new LoginView();
    view.render({el:"#container"});
  },
  scheduler: () => {
    let view = new SchedulerCreate();
    view.render({el:"#container"});
  }
});
