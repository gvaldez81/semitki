'use strict'

let SemitkiRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "dashboard": "dashboard",
    "groups": "groups",
    "accounts": "accounts",
    "about": "about"
  },

  index: () => {
    let view = new LoginView();
    view.render({el:"#container"});
  },

  schedulerCreate: () => {
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
  },

  accounts: () => {
    let view = new AccountsView();
    view.render({el:"#container"});
  },
 
  about: () =>  {
    let view = new AboutView();
    view.render({el:"#container"});
  }
    

});
