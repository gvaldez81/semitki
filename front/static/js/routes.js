'use strict'

let SemitkiRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "dashboard": "dashboard",
    "groups": "groups",
    "accounts": "accounts",
    "about": "about",
    "user": "user" ,
    "campaigns": "campaigns",
    "project":  "project", "permissions":  "permissions"
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
  },
 
  user:  () =>  {
    let view = new UserView();
    view.render({el:"#container"});
  },
    
  campaigns: () => {
     let view = new CampaignsView();
     view.render({el:"#container"});
 },
    
  project: () => {
    let view = new ProjectView();
    view.render({el:"#container"});
},
 
  permissions: () => {
    let view = new PermissionsView();
    view.render({el:"#container"});
}

});
