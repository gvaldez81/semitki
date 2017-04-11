'use strict'

let SemitkiRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "dashboard": "dashboard",
    "groups": "groups",
    "groupedaccounts": "groupedAccounts",
    "accounts": "accounts",
    "about": "about",
    "user": "user" ,
    "campaign":  "campaign",
    "permissions":  "permissions",
    "contact": "contact",
    "billing": "billing",
    "accountinfo": "accountinfo",
    "pricing":  "pricing"
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

  groupedAccounts: () => {
    let view = new GroupedAccountsView();
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

  campaign: () => {
    let view = new CampaignView();
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
    },

    accountinfo: () => {
        let view = new AccountInfoView();
        view.render();
    },

    pricing: () =>{
    let view = new PricingView();
    view.render();
}

});
