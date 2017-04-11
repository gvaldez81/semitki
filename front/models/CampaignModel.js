'use strict'

let Campaign = Backbone.Model.extend({

  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },

  url: () => {
    return "/campaign/" + this.id;
  }

});
