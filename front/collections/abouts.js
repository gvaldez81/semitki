
'use strict'

let Abouts = Backbone.Collection.extend({

  model: About,
  url: apiBuilder("about")

});
