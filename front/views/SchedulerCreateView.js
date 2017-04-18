'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "container",


  initialize: function() {
    this.navigation = new NavigationView();
  },

  render: function() {
    let template = $("#scheduler-template").html();
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
    $("#main").html(this.$el);

    this.navigation.setElement(this.$("#app-nav")).render();

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
