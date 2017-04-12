'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "panel",


  events: {
    "keyup #groupFinder": "searchGroup",
    "click #save": "createPost",
    "click #delete": "delete",
    "click #isNewPost": "isNew",
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
    S.refreshToken(() => {
      let content = {};
      if($("#isNewPost").val()) {
        content.txt = $("#postText").val();
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
        phase: $("#phases").val(),
        content: content,
        owner: S.user.get("pk")
      };
      let newPost = new Post();
      newPost.save(post, S.addAuthorizationHeader());
    });
  },


  deletePost: () => {
    // TODO
    console.log("Delete post");
  },


  searchGroup: () => {
    let matches = S.collection.get("groups").search($("#groupFinder").val());
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
    posts.fetch(S.addAuthorizationHeader());
    S.fetchCollections();
    let data = {
      user: S.user.toJSON(),
      campaigns: S.collection.get("campaigns").toJSON(),
      phases: S.collection.get("phases").toJSON(),
      buckets: S.collection.get("buckets").toJSON(),
      account_groups: S.collection.get("account_group").toJSON()
    };

    let calendarFeed = () => {
      /* Build the calendar feed */
      let postArray = S.collection.get("posts").toArray();
      let feed = postArray.map((post) => {
        let phase = S.collection.get("phases").get(post.attributes.phase);
        let item = {
          "id": post.attributes.url,
//          "url": post.attributes.url,
          "url": "http://localhost:8090/#accountinfo",
          "title": phase.attributes.name,
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
      language: S.lang,
      modal: "#post-detail",
      tmpl_path: "/tmpls/",
      modal_type: "ajax",
      events_source: calendarFeed()
    });
    // Calendar navigation
    // TODO make this with Array.each() method


    $("#btn-prev").on("click", () => {
      calendar.navigate("prev");
    });
    $("#btn-day").on("click", () => {
      calendar.view("day");
    });
    $("#btn-week").on("click", () => {
      calendar.view("week");
    });
    $("#btn-month").on("click", () => {
      calendar.view("month");
    });
    $("#btn-next").on("click", () => {
      calendar.navigate("next");
    });

    return this;
  }
});
