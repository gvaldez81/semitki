'use strict'

let editCampaign = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  events: {
    "submit form": "onSubmit"
  },


  initialize: function(data) {
    this.data = data || undefined;
  },


/*  renderLoading: function() {*/
    //console.log('Dialog ' + this.dialogName + ' rendered loading');
    //this.$el.html('<div id="dialog_' + this.dialogName + '" class="modal dialog_' + this.dialogName + '" role="dialog" aria-labelledby="dialog_label">' +
      //'<div class="modal-dialog"><div class="modal-content modal-loading">Loading</div></div></div>');
  /*},*/


  render: function(){
    let template = $("#campaign-modal-edit").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog-edit").html(this.$el);
  },


});
