'use strict'

let SemitkiRouter = Backbone.Router.extend({

  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "dashboard": "dashboard",
    "groups": "groups",
    "groupedaccounts": "groupedAccounts",
    "accounts": "accounts",
    "about": "about", // TODO Check if still used
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
    S.refreshToken(() => {
      let view = new SchedulerCreateView();
      view.render();
    });
  },

  dashboard: () => {
    S.refreshToken(() => {
      let view = new DashboardView();
      view.render();
    });
  },

  groups: () => {
    S.refreshToken(() => {
      let view = new GroupsView();
      view.render();
    });
  },

  groupedAccounts: () => {
    S.refreshToken(() => {
      let view = new GroupedAccountsView();
      view.render();
    });
  },

  accounts: () => {
    S.refreshToken(() => {
      let view = new AccountsView();
      view.render();
    });
  },

  about: () =>  { // TODO Check if is still used, I think it is  not
    S.refreshToken(() => {
      let view = new AboutView();
      view.render();
    });
  },

  user:  () =>  {
    S.refreshToken(() => {
      let view = new UserView();
      view.render();
    });
  },

  campaign: () => {
    S.refreshToken(() => {
      let view = new CampaignView();
      view.render();
    });
  },

  permissions: () => {
    S.refreshToken(() => {
      let view = new PermissionsView();
      view.render();
    });
  },

  contact: () => {
    S.refreshToken(() => {
      let view = new ContactView();
      view.render();
    });
  },

  billing: () => {
    S.refreshToken(() => {
      let view = new BillingView();
      view.render();
    });
  },

  accountinfo: () => {
    S.refreshToken(() => {
      let view = new AccountInfoView();
      view.render();
    });
  },

  pricing: () =>{
    S.refreshToken(() => {
      let view = new PricingView();
      view.render();
    });
  }

});
