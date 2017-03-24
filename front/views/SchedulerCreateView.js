'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "panel",


  events: {
    "keyup #groupFinder": "searchGroup",
    "click #save": "createPost",
    "click #delete": "delete",
    "click #isNewPost": "isNew",
    "click .selection": "selectGroup"
  },


  selectGroup: () => {
    console.log("Selected group");
  },

  isNew: () => {
    //TODO Meh! Fix it later, very low priority
     if($("#isNewPost").val() === "1") {
      $("#postUrl").attr("disabled", "true");
      $("#postTxt").removeAttr("disabled");
    } else {
      $("#postTxt").attr("disabled", "true");
      $("#postUrl").removeAttr("disabled");
    }

  },


  createPost: () => {

    let content = {};
    if($("#isNewPost").val()) {
      content.txt = $("postText").val();
    } else {
      content.url = $("#postUrl").val();
    }

    let img = $("#postImageUrl").val();
    if(img !== "") {
      content.imgurl = img;
    }

    content.tags = $("#networks").val();


    let post = {
      date: new Date($("#scheduledFor").val()),
      topic: $("#topics").val(),
      content: content,
      owner: Semitki.user.get("url")
    };
    let newPost = new Post();
    newPost.save(post, Semitki.addAuthorizationHeader());
  },


  deletePost: () => {
    // TODO
    console.log("Delete post");
  },


  searchGroup: () => {
    let matches = Semitki.collection.get("groups").search($("#groupFinder").val());
    if(typeof matches !== 'undefined') {
      let results = new GroupFinderView({collection: matches});
      results.render();
      $("#groupFinderItems").show();
    }
  },


  render: function() {
    let template = $("#scheduler-create-template").html();
    let compiled = Handlebars.compile(template);
    let posts = new Post();
    posts.fetch(Semitki.addAuthorizationHeader());
    Semitki.fetchCollections();
    let data = {
      user: Semitki.user.toJSON(),
      projects: Semitki.collection.get("projects").toJSON(),
      topics: Semitki.collection.get("topics").toJSON(),
      buckets: Semitki.collection.get("buckets").toJSON(),
    };

    let calendarFeed = () => {
      /* Build the calendar feed */
      let postArray = Semitki.collection.get("posts").toArray();
      let feed = postArray.map((post) => {
        let item = {
          "id": post.attributes.url,
          "url": post.attributes.url,
          "title": post.attributes.topic,
          "class": "event-info",
          "start": Date.parse(post.attributes.date),
          "end": Date.parse(post.attributes.date),
        };
        return item;
      });
      return feed;
    }

    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    // Initialize datimepicker here after rendering, otherwise it won't work
    $('#scheduledForPicker').datetimepicker();
    // Initialize all select controls as select2
    $("#accordion").find("select").select2();
    // Initialize calendar view
    let calendar = $("#calendar-panel").calendar({
      tmpl_path: "/tmpls/",
      events_source: calendarFeed()
    });

    return this;
  }
});
