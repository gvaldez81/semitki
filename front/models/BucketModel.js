'use strict'

let Bucket = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined,
      "description": undefined,
    }
  },


  url: () => {
    return "/bucket/" + this.id;
  }


});
