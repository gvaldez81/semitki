'use strict'

let GroupFinderView = Backbone.View.extend({
  tagName: "div",

  className: "col-md-12 table-responsive",

  events: {
    "click .selection": "selectGroup"
  },


  selectGroup: (e) => {
/*    Semitki.post_groups = [];*/
    /*Semitki.post_groups.push(e.target.value);*/
    console.log(Semitki.post_groups);
  },


  render: function() {
    let template = $("#group-finder-template").html();
    let compiled = Handlebars.compile(template);
    Semitki.post_groups = 
    this.$el.html(compiled(this.collection[0].attributes));
    $("#groupFinderItems").html(this.$el);
    return this;
  }
});
