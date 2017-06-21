'use strict'

let TourViews = Backbone.Collection.extend({

  model: TourView,

  url: () => {
    return apiBuilder("tour_view");
  }
});
