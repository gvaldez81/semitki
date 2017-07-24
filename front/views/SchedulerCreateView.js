'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "container",

  initialize: function() {
    this.tour = S.tour('SchedulerCreateView');
    this.navigation = new NavigationView();
    this.footer = new FooterView();
    this.followers = new FollowerMenuView();
    this.staff = new StaffMenuView();
    this.navigation.render();
    this.footer.render();
    this.render();

    return this;
  },


  render: function() {
    S.fetchCollections();
    let template = $("#scheduler-template").html();
    let compiled = Handlebars.compile(template);

    S.toggleNavigation(true);

    let posts = new Post();
    posts.fetch(S.addAuthorizationHeader());
    let data = {
      campaigns: S.collection.get("campaigns").toJSON(),
      phases: S.collection.get("phases").toJSON(),
      buckets: S.collection.get("buckets").toJSON(),
      account_groups: S.collection.get("account_groups").toJSON()
    };

    let calendarFeed = S.calendarFeed();

    this.$el.html(compiled(data));
    $("#main").html(this.$el);

    // Initialize datimepicker here after rendering, otherwise it won't work
    $('#scheduledForPicker').datetimepicker();
    // Initialize calendar view
    let calendar = $("#calendar-panel").calendar({
      tooltip_container: "main",
      language: S.lang.substr(0, 2),
      locale: S.lang.substr(0, 2),
      modal: "#dialog",
      tmpl_path: "/tmpls/",
      modal_type: "ajax",
      events_source: calendarFeed
    });

    // Calendar navigation
    let calButton = ['prev', 'next', 'day', 'week', 'month', 'year'];
    // TODO make this with Array.each() method
    calButton.map((target) => {
      if(target === 'prev' || target === 'next') {
        $('#btn-' + target).on('click', () => {
          calendar.navigate(target);
        });
      } else {
        $('#btn-' + target).on('click', () => {
          calendar.view(target);
        });
      }
    });

    // Menus
    this.followers.render();
    this.staff.render();

    if (this.tour != undefined){
      this.tour.start(true);
    }

    return this;
  }
});
