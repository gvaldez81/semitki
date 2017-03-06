
'use strict'

let Groups = Backbone.Collection.extend({

  model: Group,

  url: apiBuilder("accounts_group"),

  search: (group) => {
    switch(group.length) {
      case 0:
        break;
      case 1:
        console.log("do something");
        break;
      default:
        let localResult = Semitki.collection.get("groups").where({name: group});
        Semitki.collection.get("groups")
          .fetch(Semitki.addAuthorizationHeader());
        console.log(localResult);
    }
  }
});
