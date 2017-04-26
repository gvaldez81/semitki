'use strict'

let editCampaign = Backbone.View.extend({
  tagName: "div",


  className: "modal-dialog",

  isVisible: false,
  focusOnInit: false,
  initialFocus: function() {
    if ('ontouchstart' in window || navigator.maxTouchPoints)
      return false; /// do not focus on touch devices
    if (!this.focusOnInit)
      return false;

    this.$(this.focusOnInit).focus();
    return true;
  },

  events: {
    "submit form": "onSubmit"
  },
  focusOnInit: '#input_name',


  initialize: function(data) {
    this.data = data || undefined;
  },

/*
    if (typeof(params.item) != 'undefined')
      this.item = params.item;
    else
      throw 'Can not initialize dialog without param.item';

    this.show({
      item: this.item.toJSON()
    });*/
 

  renderLoading: function() {
    console.log('Dialog ' + this.dialogName + ' rendered loading');
    this.$el.html('<div id="dialog_' + this.dialogName + '" class="modal dialog_' + this.dialogName + '" role="dialog" aria-labelledby="dialog_label">' +
      '<div class="modal-dialog"><div class="modal-content modal-loading">Loading</div></div></div>');
  },
  render: function(){
    let template = $("#campaign-modal").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $("#dialog").html(this.$el);
    if (this.data !== undefined){
      this.$el.modal({show : true})
    }
  },

  hide: function() {
    console.log("Hide dialog");
    this.$el.children().modal('hide');
  }

});
