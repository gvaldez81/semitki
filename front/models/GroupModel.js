'use strict'

let Group = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
    }
  },


  url: () => {
    return "/account_group/" + this.id;
  }


});
