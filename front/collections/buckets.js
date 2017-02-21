
'use strict'

let Buckets = Backbone.Collection.extend({

  model: Bucket,
  url: "//127.0.0.1:8000/bucket/"

});
