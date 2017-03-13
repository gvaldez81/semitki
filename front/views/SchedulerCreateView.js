'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "panel",

  events: {
    "keyup #groupFinder": "searchGroup",
    "click #save": "createPost",
    "click #delete": "delete"
  },

  createPost: () => {
    let d = {};
    if($("#isNewPost").val()) {
      d.txt = $("postText");
    } else {
      d.url = $("#postUrl").val();
    }
    let img = $("#postImageUrl").val();
    if(img !== "") {
      d.imgurl = img;
    }
    d.tags = $("#networks").val();
    let content = {
      date: new Date($("#scheduledFor").val()),
      topic: $("#topics").val(),
      data: d,
      owner: Semitki.user.id
    };
    let url = apiBuilder("post")
    //let csrftoken = Cookies.get("csrftoken");
    $.ajax(url,
    {
      beforeSend: (xhr, settings) => {
        xhr.setRequestHeader(Semitki.addAuthorizationHeader())
      },
      data: content,
      method: "POST",
      dataType: "JSON"
    });
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
    let posts = new Posts();
    posts.fetch(Semitki.addAuthorizationHeader());
    Semitki.fetchCollections();
    let data = {
      user: Semitki.user.toJSON(),
      posts: posts.toJSON(),
      projects: Semitki.collection.get("projects").toJSON(),
      topics: Semitki.collection.get("topics").toJSON(),
      buckets: Semitki.collection.get("buckets").toJSON(),
    };
    this.$el.html(compiled(data));
    $("#container").html(this.$el);
    // Initialize datimepicker here after rendering, otherwise it won't work
    $('#scheduledForPicker').datetimepicker();
    $("#accordion").find("select").select2();
    return this;
  }
});
