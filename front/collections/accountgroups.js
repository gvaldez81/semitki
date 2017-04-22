
'use strict'

let AccountGroups = Backbone.Collection.extend({

  	model: AccountGroup,

  	url: apiBuilder("account_group"),

	//Filter down the list to only todo items that are still not finished.
	filtering: function(group) {
		//S.collection.set("related", this.where({social_group: group}))
		S.collection.set("related", new AccountGroups())
		S.collection.get("related").add(this.where({social_group: group}))
	}
  
});

// search: (group) => {
//     switch(group.length) {
//       case 0:
//         $("#groupFinderItems").hide();
//         break;
//       case 1:
//         $("#groupFinderItems").hide();
//         console.log("do something");
//         break;
//       default:
//         let localResult = S.collection.get("groups").where({name: group});
//         if(localResult.length < 1) {
//           S.collection.get("groups")
//             .fetch(S.addAuthorizationHeader());
//         } else {
//           return localResult;
//         }
//     }