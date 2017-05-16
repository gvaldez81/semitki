'use strict'

let AccountGroups = Backbone.Collection.extend({

  	model: AccountGroup,

  	url: apiBuilder("account_group"),

	//Filter down the list to only todo items that are still not finished.
	filtering: function(group) {
		S.collection.set("related", new AccountGroups());
		S.collection.get("related").add(this.where({social_group: group}));
	}
});
