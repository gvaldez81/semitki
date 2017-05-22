'use strict'

let ConnectedSortable = Backbone.View.extend({

  tagName: "table",

  className: "table table-striped table-bordered table-list",

  initialize: function(options) {
    _.extend(this, _.pick(options, "templateId", "targetId", "relatedTable",
    "data"));
  },


  render: function() {

    let template = $(this.templateId).html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled(this.data));
    $(this.targetId).html(this.$el);

    let $tabs = $(this.relatedTable);
    $("tbody.connectedSortable")
       .sortable({
           connectWith: ".connectedSortable",
           items: "> tr:not(:first)",
           appendTo: $tabs,
           helper: "clone",
           zIndex: 999990
       }).disableSelection();

  }
});
