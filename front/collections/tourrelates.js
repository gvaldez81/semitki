'use strict'

let TourRelates = Backbone.Collection.extend({

  model: TourRelated,

  url: () => {
    return apiBuilder("tour_relates");
  }
});
