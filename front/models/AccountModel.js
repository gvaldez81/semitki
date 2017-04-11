'use strict'

let Account = Backbone.Model.extend({


  defaults: () => {
    return {
      "username": undefined,
      "email": undefined,
      "access_token": undefined,
      "token_expiration": undefined,
      "isactive": undefined,
      "valid_to": undefined,
    }
  },


  url: () => {
    return "/account/" + this.id;
  }


});
