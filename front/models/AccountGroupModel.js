'use strict'

let AccountGroup = Backbone.Model.extend({


  defaults: () => {
    return {
      "social_account": undefined,
      "social_account_url": undefined,
      "social_group": undefined,
      "social_group_url": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },

  url: () => {
    return "/account_group/" + this.id;
  }

});
