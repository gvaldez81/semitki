'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "container",


  initialize: function() {
    // TODO And it still fails, argh!!
//    S.persistSignedUser(); // Ulgy hack, find a better way to persist the user!
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.modal = new CalendarModal();
    this.navigation.render();
    this.footer.render();
    this.modal.render();
    this.render();
  },

  render: function() {
    S.fetchCollections();
    let template = $("#scheduler-template").html();
    let compiled = Handlebars.compile(template);

    S.toggleNavigation(true);

    let groupMenu = new GroupMenuView();
    groupMenu.render();
    let staffMenu = new StaffAccountsView();
    staffMenu.render();
/*    let fbPages = new FbPageSearch();*/
    /*fbPages.render();*/

    let posts = new Post();
    posts.fetch(S.addAuthorizationHeader());
    let data = {
      campaigns: S.collection.get("campaigns").toJSON(),
      phases: S.collection.get("phases").toJSON(),
      buckets: S.collection.get("buckets").toJSON(),
      account_groups: S.collection.get("account_groups").toJSON()
    };

    let calendarFeed = () => {
      /* Build the calendar feed */
      let postArray = S.collection.get("posts").toArray();

      let feed = postArray.map((post) => {

      let long = 50;
      let bucket = post.attributes.content.tags[0].account.charAt(0).toUpperCase()
                  + post.attributes.content.tags[0].account.slice(1);
      let account = (post.attributes.content.username==undefined ? "N/A" : post.attributes.content.username).substring(0,10);
      let text = post.attributes.content.txt;
      let cut = post.attributes.content.txt.substring(0,long);

      let content = cut.padEnd((text.length>long ? long+3 : cut.length),'.') 
      content = content + (text.length>long ? " and " + (text.length - long) + " characters more" : "") 
                

      let item = {
          "id": post.attributes.url,
          "url": (post.attributes.content.permalink == undefined ? '' : post.attributes.content.permalink),
          "title": bucket + " | " + account + " | " + content,
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


    // Initialize datimepicker here after rendering, otherwise it won't work
    $('#scheduledForPicker').datetimepicker();
    // Initialize calendar view
    let calendar = $("#calendar-panel").calendar({
      tooltip_container: "main",
      language: S.lang,
      modal: "#dialog",
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
