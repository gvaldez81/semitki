'use strict'

let AddPostView = Backbone.View.extend({


  tagName: "div",


  className: "container addpost-form",




  events: {
    "click #closeadd": "closeadd",
    "click #publish-btn": "publish",
    "select #campaignSelectorBox": "showPhases"
  },


  initialize: function(data) {
    this.data = data || {};
    this.data.campaigns = S.collection.get("campaigns").toJSON().map((i) => {
      return S.collection2select({id: i.id, text: i.name});
    });
    S.toggleNavigation();
    this.scheduler = new SchedulerCreateView();
  },


  closeadd: function() {
    S.toggleNavigation(true);
    this.remove();
    this.scheduler.render();
  },


  showPhases: (e) => {
   console.log(e);
  },


  publish: () => {
    let content = {
      txt: $("#postxt").val(),
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
    this.$el.html(compiled(this.data));

    $("#main").html(this.$el);

    $("#campaignSelectorBox").select2({data: this.data.campaigns});

    return this;
  }
});
