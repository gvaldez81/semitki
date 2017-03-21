'use strict'

let Bucket = Backbone.Model.extend({


  defaults: () => {
    return {
      "name": undefined
    }
  },


  url: () => {
    return "/bucket/" + this.name;
  }


});
