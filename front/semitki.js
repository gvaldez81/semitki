'use strict'


let S = {

  initialize: function() {
    Backbone.history.start({pushState: false});        // Initialize Backbone web browser history support
    this.router = new SemitkiRouter();                // Initialize Backbone routes
    $.material.init();                                // Boostrap Material Design
    // Select boxes default settings
    $.fn.select2.defaults.set("allowClear", false);
    this.jwtheader = "JWT ";                          // Token prefix for authorization custom header
    // BackBone collection instances
    // Heil ES6 Map!
    this.collection = new Map ();                     // System catalogs colection
    // Collections == Catalogs
    this.collection.set("accounts", new Accounts());
    this.collection.set("user", new Users());
    this.collection.set("pages", new Pages());
    this.collection.set("groups", new Groups());
    this.collection.set("account_groups", new AccountGroups());
    this.collection.set("campaigns", new Campaigns());
    this.collection.set("phases", new Phases());
    this.collection.set("buckets", new Buckets());
    this.collection.set("posts", new Posts());
    this.collection.set("tour_view",new TourViews());
    this.collection.set("tour_element",new TourElements());
    this.collection.set("tour_relates",new TourRelates());
    // Views registry
    this.view = new Map();
    this.view.set('footer', new FooterView());
    this.view.set('login', new LoginView());
    this.view.set('scheduler', new SchedulerView());
    this.view.set('navigation', new NavigationView());
    this.view.set('menu', new SideMenuView());
    this.user = new UserModel();                      // Signed in user
    if(sessionStorage.getItem("user")) {
      this.user.set(JSON.parse(sessionStorage.user));
    }
    this.users = new Users();                         // User collection
    this.hideSideMenu = true;                           // Keep the side menu hidden fro start

    this.lang = "es-ES"                                  // UX language
    this.polyglot = new Polyglot({locale: this.lang});
    this.initPolyglot();
    this.pt = Handlebars.registerHelper("pt", (phrase, options) => {
      return this.polyglot.t(phrase, options.hash);
    });

    return this;
  },


  addAuthorizationHeader: () => {
    return {
      headers: {'Authorization': S.jwtheader.concat(S.jwtoken())}
    }
  },


  api: (resource) => {
    // Builds the api url of a given resource
    if(SEMITKI_CONFIG.api_port == undefined) {
      return "//" + SEMITKI_CONFIG.api_url + "/" + resource + "/";
    } else {
      return "//" + SEMITKI_CONFIG.api_url + ":" + SEMITKI_CONFIG.api_port + "/" + resource + "/";
    }
  },


  calendarFeed: () => {
    let postArray = S.collection.get("posts").toArray();

    let feed = postArray.map((post) => {

      let FIXED_USER_LONG = 10

      let bucket = post.attributes.content.tags[0].account.charAt(0)
        .toUpperCase() + post.attributes.content.tags[0].account.slice(1);

      let username = (post.attributes.content.username == undefined ? "N/A"
        : post.attributes.content.username );
      let user_length = username.length;
      username = username.substring(0,FIXED_USER_LONG);
      username = username.padEnd((user_length > FIXED_USER_LONG
        ? FIXED_USER_LONG + 3 : user_length ), '.');

      let FIXED_TEXT_LONG = 60;
      let text = post.attributes.content.txt;
      let text_length = text.length;
      text = text.substring(0,FIXED_TEXT_LONG);
      text =  text.padEnd((text_length > FIXED_TEXT_LONG ? FIXED_TEXT_LONG + 3
        : text_length), '.');
      text = text + (text_length > FIXED_TEXT_LONG ? " and "
        + (text_length - FIXED_TEXT_LONG) + " characters more" : "");

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
  },


  collection2select: (jsonMap) => {
    // Get a { id, text } closure and return another closure for select2
    return {
      "id": jsonMap.id,
      "text": jsonMap.text
    };
  },


  fbtoken: function(token) {
    // This code seems redundant, refactor to reuse in some way ASAP
    if (token === undefined) {
      return sessionStorage.getItem("token");
    } else {
      sessionStorage.setItem("token", token);
    }
  },


  fixUrl: (modelUrl) => {
    return modelUrl+(modelUrl.charAt(modelUrl.length - 1) == "/" ? "" : "/");
  },


  handlebarsCompile: (templateId) => {
    let template = $(templateId).html();
    let compiled = Handlebars.compile(template);
    return compiled;
  },


  logger: (level, text, debug = false) => {
    // Sort of system logger, text will be rendered in any DIV element
    // with id="messages"
    let verbose = function() {
      debug = true;
    }

    if (debug)
      console.log(text);

    // TODO use level to determine the classes
    let divmsg = $("#messages");
    divmsg.empty()
      .removeClass(() => {
      return "bg-info bg-success bg-danger";
    });

    divmsg.addClass(level).html("<h4>"+ S.polyglot.t(text) + "</h4>")
      .fadeIn(400, () => { $("#messages").fadeOut(4000); });
  },


  // TODO something like fetchCollections(success, error)
  // for callbacks to be passed to Backbone.collection.fetch
  fetchCollections: (options = {}) => {
    if(typeof options.collection === 'string' &&
      typeof options.callback === 'function') {
      S.collection.get(options.collection).fetch({
        success: options.callback
      });
    } else {
      for (let [key, value] of S.collection) {
        value.fetch({
          headers: S.addAuthorizationHeader().headers
        });
      }
      if(typeof options.callback === 'function') {
        options.callback.call(this);
      }
    }
  },


  jwtoken: function(token) {
    // Set or get the JWT
    if (token === undefined) {
      return sessionStorage.getItem("token");
    } else {
      sessionStorage.setItem("token", token);
    }
  },


  persistSignedUser: () => {
    // TODO not working, user's update is not persisted if found
    let u = S.collection.get("user").findWhere({
      email: S.user.attributes.email
    });
    u.set(S.user.toJSON());
    S.collection.get("user").sync("update", u, S.addAuthorizationHeader());
  },


  fbStatusChangeCallback: (response) => {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      S.fbtoken(response.authResponse.accessToken);
      return true;
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('You need to authorize the facebook app first');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log("Log into Facebook first");
    }
  },


  fbGetLoginStatus: () => {
    FB.getLoginStatus((response) => {
      S.fbStatusChangeCallback(response);
    });
  },


  initPolyglot: function() {
    this.polyglot.replace(poles);
  },


  refreshToken: (secureFunction) => {
    // Wrap every function triggered by user interaction within this function
    let is_valid = new Promise((resolve, reject) => {
      $.ajax(S.api("api-token-refresh"),
      {
        data: {
          "token": S.jwtoken()
        },
        method: "POST"
      }).done(resolve).fail(reject);
    });

    is_valid.then((result) => {
      S.jwtoken(result.token);
      secureFunction.call();
    }, (err) => {
      S.logger("bg-danger", S.polyglot.t("auth.invalidtoken"));
      S.sessionDestroy();
      S.view.get('login').render();
    });
  },


  sessionDestroy: () => {
    sessionStorage.clear();
  },


  splitQueryString: (a) => {
    if (a == "") return {};
    let b = {};
    for (let i = 0; i < a.length; ++i) {
      let p = a[i].split('=', 2);
      if(p.length == 1)
        b[p[0]] = "";
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  },


  showButtons: () => {
    // TODO show which buttons? Is it generic enough to be in S?
    $(".list-group-item").hover(function() {
      $(this).find('div.item_buttons.hideme.crud_buttons').addClass('showme')
      $(this).css("background-color","transparent")
    },
    function() {
      $(this).find('div.item_buttons.hideme.crud_buttons').removeClass('showme')
      $(this).css("background-color","#eee")
    });
  },


  toggleMenu: () => {
    S.view.get('menu').render();
    $(".menu-slide").show().hover(() => {
      $(".menu-slide").addClass("menu-slide-show");
      $("#main").addClass("corp-show");
    },
    () => {
      $(".menu-slide").removeClass("menu-slide-show");
      $("#main").removeClass("corp-show");
    });
  },


  toggleNavigation: (enable=false) => {
    // Hide or show navigation elements (top and side menu)
    if(enable) {
      S.view.get('navigation').render();
      $("#app-nav").show();
      S.toggleMenu();
    } else {
      $("#app-nav").hide();
      $(".menu-slide").hide();
    }
  },


  tour: (viewName) => {
    let tourFiltered = S.collection.get("tour_element").filter(function(obj) {
      return obj.attributes.view == viewName;
    });

    if (tourFiltered.length > 0) {
      let tour = new Tour({storage:false});
      tour.init();
      //sorteamos el arreglo por el Title. Importante a la hora de registrar elementos
      tourFiltered.sort(function(a,b) {
        return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
      });

      let data = tourFiltered.map(element => {
        let salida  = {
          element: element.attributes.name,
          title :  element.attributes.title,
          content : element.attributes.content,
        };
        return $.extend(salida, element.attributes.options)
      });

      tour.addSteps(data);

      return tour;
    }
  },

  unrelatedAccounts: function(related) {
    let related_set = new Set(related.items.map(account => {
      return account.social_account_url.id;
    }));
    // Get all accounts in a Set
    let accounts = new Set(S.collection.get("accounts").toJSON().map(account => {
      return account.id;
    }));
    // Delete from accounts the related ones
    let unrelated = new Set([...related_set].filter(x => {
      if(accounts.has(x))
        accounts.delete(x);
    }));
    // Iterate account ids and return JSON for view
    let data = [...accounts].map(account => {
      let a = S.collection.get("accounts").get({id: account}).toJSON();
      return {
        id: a.id,
        social_account_url: { bucket: a.bucket, username: a.username }
      };
    });
    return { items: data };
  },
};

// Launch the JavaScript client side app
$(() => {
  if(window.location.hash.startsWith("#landing")) {
    // If landing page render it only
    let app = new LandingPageView();
    app.render();
  } else {
    // initialize Semitki
    S.initialize();
    if(!sessionStorage.getItem("token") || !sessionStorage.getItem("user")) {
      // If we can't find a previous session stored render a new LoginView
      S.view.get('login').render();
    } else {
      // if there is a session try to refresh the token and navigate to Scheduler
      S.refreshToken(() => {
        S.view.get('scheduler').render();
      });
    }

/*    if ('serviceWorker' in navigator) {*/
      //window.addEventListener('load', function() {
        //navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
          //// Registration was successful
          //console.log('ServiceWorker registration successful with scope: ', registration.scope);
        //}, function(err) {
          //// registration failed :(
          //console.log('ServiceWorker registration failed: ', err);
        //});
      //});
    //}

  }
});
