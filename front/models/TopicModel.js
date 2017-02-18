'use strict'

let Topic = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
    }
  },


  url: () => {
    return "/topic/" + this.id;
  }


});
