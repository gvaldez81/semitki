'use strict'

let Project = Backbone.Model.extend({

  defaults: () => {
    return {
      "url": undefined,
      "name": undefined,
      "description": undefined,
      "campaing_id": undefined
    }
  },

});
