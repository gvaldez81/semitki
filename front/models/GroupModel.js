'use strict'

let Group = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
      "url": undefined
    }
  },

  url: () => {
    return apiBuilder("accounts_group/" + this.get("id"));
  }

});
