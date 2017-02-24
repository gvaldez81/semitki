
'use strict'

let Buckets = Backbone.Collection.extend({

  model: Bucket,
  url: apiBuilder("bucket")

});
