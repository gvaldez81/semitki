'use strict'

let Groups = Backbone.Collection.extend({

  model: Group,
  url: apiBuilder("group"),

  //Filter down the list to only todo items that are still not finished.
  filtering: function (group) {
    //S.collection.set("related", this.where({social_group: group}))
    S.collection.set("related", new Groups())
    S.collection.get("related").add(this.where({id: group}))
  },

    filtera: function (group) {
    //S.collection.set("related", this.where({social_group: group}))
    S.collection.set("filter", new Groups())
    S.collection.get("filter").add(this.where({id: group}))
  }


});
