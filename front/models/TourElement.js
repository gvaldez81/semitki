'use strict'

let TourElement = Backbone.Model.extend({

  defaults: () => {
  	
    return {
    	
      "name": undefined,
      "title": undefined,
	    "content": undefined,
      "options": undefined,
      "view": undefined,
      "isactive": undefined
      
    }
  },

});