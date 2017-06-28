'use strict'

let SchedulerCreateView = Backbone.View.extend({

  tagName: "div",

  className: "container",

  initialize: function() {
    
    let tourFiltered = S.collection.get("tour_element").filter(
      function(obj){ return obj.attributes.view == "SchedulerCreateView"})
    if (tourFiltered.length>0){
      this.tour = new Tour({storage:false});
      this.tour.init();
      //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
      tourFiltered.sort(function(a,b) {
          return (a.title > b.title) 
                  ? 1 : ((b.title > a.title) 
          ? -1 : 0);} );
      
      let data = tourFiltered.map(element => {
            let salida  = {
              element: element.attributes.name,
              title :  element.attributes.title,
              content : element.attributes.content,  
            };
            //TODO Change for JS
            return $.extend(salida, element.attributes.options)
        });
      return this.tour.addSteps(data);
    }
    
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

      let FIXED_USER_LONG = 10

      let bucket = post.attributes.content.tags[0].account.charAt(0).toUpperCase()
                  + post.attributes.content.tags[0].account.slice(1);

      let username = (post.attributes.content.username==undefined ? "N/A" : post.attributes.content.username );
      let user_length = username.length;
      username = username.substring(0,FIXED_USER_LONG);
      username = username.padEnd((user_length>FIXED_USER_LONG ? FIXED_USER_LONG+3 : user_length ), '.');

      let FIXED_TEXT_LONG = 60;
      let text = post.attributes.content.txt;
      let text_length = text.length;
      text = text.substring(0,FIXED_TEXT_LONG);
      text =  text.padEnd((text_length>FIXED_TEXT_LONG ? FIXED_TEXT_LONG+3 : text_length),'.')
      text = text + (text_length>FIXED_TEXT_LONG ? " and " + (text_length - FIXED_TEXT_LONG) + " characters more" : "")

      //.padEnd(FIXED_USER_LONG+3, "\u00A0")
      let item = {
          "id": post.attributes.url,
          "url": (post.attributes.content.permalink == undefined ? '' : post.attributes.content.permalink),
          "title":  bucket
                    + " | " + username
                    + " | " + text,
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

    if (this.tour != undefined){
      this.tour.start(true);  
    }    

    return this;
  }
});
