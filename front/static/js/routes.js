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
    "project":  "project",
    "permissions":  "permissions",
    "contact": "contact",
    "billing": "billing"
  },

  index: () => {
    let view = new LoginView();
    view.render();
  },

  schedulerCreate: () => {
    let view = new SchedulerCreateView();
    view.render();
  },

  dashboard: () => {
    let view = new DashboardView();
    view.render();
  },

  groups: () => {
    let view = new GroupsView();
    view.render();
  },

  accounts: () => {
    let view = new AccountsView();
    view.render();
  },

  about: () =>  {
    let view = new AboutView();
    view.render();
  },

  user:  () =>  {
    let view = new UserView();
    view.render();
  },

  campaigns: () => {
     let view = new CampaignsView();
     view.render();
 },

  project: () => {
    let view = new ProjectView();
    view.render();
  },

    permissions: () => {
      let view = new PermissionsView();
      view.render();
  },
    contact: () => {
      let view = new ContactView();
      view.render();
  },
    
    billing: () => {
        let view = new BillingView();
        view.render();
    }

});
