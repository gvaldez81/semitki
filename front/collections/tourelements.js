'use strict'

let TourElements = Backbone.Collection.extend({

  model: TourElement,

  url: () => {
    return apiBuilder("tour_element");
  }
});
