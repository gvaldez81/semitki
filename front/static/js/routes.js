'use strict'

let SemitkiRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "dashboard": "dashboard",
    "groups": "groupsViews"
  },
  index: () => {
    let view = new LoginView();
    view.render({el:"#container"});
  },

    scheduler: () => {
    let view = new SchedulerCreateView();
    view.render({el:"#container"});
  },
  dashboard: () => {
    let view = new DashboardView();
    view.render({el:"#container"});
  },
    
  groups: () => {
    let view = new GroupsView();
    view.render({el:"#container"});
}
});
