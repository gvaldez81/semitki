'use strict'

let TourView = Backbone.Model.extend({

  defaults: () => {
  	
    return {
      "name": undefined,
      "description": undefined,
      "isactive": undefined,
     
    }
  },

});