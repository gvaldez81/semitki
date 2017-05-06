'use strict'

let Group = Backbone.Model.extend({
  idAttribute: "id",

  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },

});
