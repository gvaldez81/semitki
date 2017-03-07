
'use strict'

let Groups = Backbone.Collection.extend({

  model: Group,

  url: apiBuilder("accounts_group"),

  search: (group) => {
    switch(group.length) {
      case 0:
        $("#groupFinderItems").hide();
        break;
      case 1:
        $("#groupFinderItems").hide();
        console.log("do something");
        break;
      default:
        let localResult = Semitki.collection.get("groups").where({name: group});
        if(localResult.length < 1) {
          Semitki.collection.get("groups")
            .fetch(Semitki.addAuthorizationHeader());
        } else {
          return localResult;
        }
    }
  }
});
