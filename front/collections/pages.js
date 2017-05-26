
'use strict'

let Pages = Backbone.Collection.extend({

  model: Page,
  url: apiBuilder("page"),

//Filter down the list to only todo items that are still not finished.
  filtering: function(account) {
	S.collection.set("pages_related", new Pages());
	S.collection.get("pages_related").add(this.where({account_id: account}));
  }
});

