'use strict'

let SemitkiRouter = Backbone.Router.extend({


  routes: {
    "": "index",
    "scheduler": "schedulerCreate",
    "groups": "groups",
    "groupedaccounts": "groupedAccounts",
    "landing": "landing",
    "accounts": "accounts",
    "user": "user",
    "campaign": "campaign",
    "permissions": "permissions",
    "accountinfo": "accountinfo",
    "grouppedaccounts": "grouppedaccounts",
    "phases": "phases",
  },


  initialize: function (options) {
    if (!sessionStorage.getItem("token") || !sessionStorage.getItem("user")) {
      S.sessionDestroy();
    }
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


  landing: () => {
    let view = new LandingPageView();
    view.render();
  },


  accounts: () => {
    S.refreshToken(() => {
      let view = new AccountsView();
      view.render();
    });
  },


  user: () => {
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


  campaigndetail: () => {
    S.refreshToken(() => {
      let view = new CampaignDetailView();
      view.render();
    });
  },


  permissions: () => {
    S.refreshToken(() => {
      let view = new PermissionsView();
      view.render();
    });
  },


  accountinfo: () => {
    S.refreshToken(() => {
      let view = new AccountInfoView();
      view.render();
    });
  },


  grouppedaccounts: () => {
    S.refreshToken(() => {
      let view = new GrouppedAccountsView();
      view.render();
    });
  },


  phases:() => {
      S.refreshToken(() => {
      let view = new PhaseView();
      view.render();
    });
  }

});
