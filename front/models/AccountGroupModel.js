'use strict'

let AccountGroup = Backbone.Model.extend({


  defaults: () => {
    return {
      "socialaccount": undefined,
      "socialgroup": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },

  url: () => {
    return "/account_group/" + this.id;
  }

});
