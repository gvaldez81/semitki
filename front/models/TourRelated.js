'use strict'

let TourRelated = Backbone.Model.extend({

  defaults: () => {
  	
    return {
      "tourview": undefined,
      "owner": undefined,
      "show": undefined,
     
    }
  },

});