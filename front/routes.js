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


  execute: function (callback, args, name) {
    // This method is called whenever a route matches and its corresponding
    // callback is about to be executed. If there is a valid session return
    // false to cancel the current transition.
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      S.refreshToken(() => {
        //      args.push(parseQueryString(args.pop())); TODO check what to do with it
        if (callback) callback.apply(this, args);
        //return false;
      });
    } else {
      if(callback === this.landing) {
        S.router.navigate("landing", {trigger: true});
        this.landing();
      } else {
        S.router.navigate("", {trigger: true});
      }
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
