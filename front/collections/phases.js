'use strict'

let Phases = Backbone.Collection.extend({

  model: Phase,
  url: apiBuilder("phase")

});
