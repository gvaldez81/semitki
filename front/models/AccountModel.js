'use strict'

let Account = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
    }
  },


  url: () => {
    return "/account/" + this.id;
  }


});
