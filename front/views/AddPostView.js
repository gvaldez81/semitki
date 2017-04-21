'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",


  events: {
    "click #closeadd": "closeadd",
    "click #publish-btn": "publish"
  },


  initialize: function() {
    S.toggleNavigation();
    this.scheduler = new SchedulerCreateView();
  },


  closeadd: function() {
    S.toggleNavigation(true);
    this.remove();
    this.scheduler.render();
  },


  publish: () => {
    console.log("publish click");
    let content = {
      txt: "Contenido del post",
      img: "http://images2.fanpop.com/image/photos/13700000/Beautiful-Pug-pugs-13728067-1600-1200.jpg",
      tags: ["facebook", "rs"],
    };

    let post = {
      date: new Date(),
      topic: "someid",
      campaign: "coño",
      phase: "123123",
      content: content,
      owner: 1
    };

    let newPost = new Post();
    newPost.save(post, S.addAuthorizationHeader())
  },


  render: function() {
    let template = $("#addpost-template").html();
    let compiled = Handlebars.compile(template);
    this.$el.html(compiled);

    $("#main").html(this.$el);

    return this;
  }
});
