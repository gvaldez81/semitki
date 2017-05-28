'use strict'

/**
 * Initializie Facebook JavaScript SDK
 */
window.fbAsyncInit = function() {
  FB.init({
          appId      : SEMITKI_CONFIG.fb_app_id,
          xfbml      : true,
          version    : 'v2.6'
        });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function sameOrigin(url) {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  let host = document.location.host; // host + port
  let protocol = document.location.protocol;
  let sr_origin = '//' + host;
  let origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !(/^(\/\/|http:|https:).*/.test(url));
};

function csrfSafeMethod(method) {
// these HTTP methods do not require CSRF protection
   return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
};

function apiBuilder(resource) {
  // TODO marked for deprecation over S.api
  console.log("apiBuilder is marked for deprecation, use S.api instead!");
  // Builds the api url of a given resource
  if(SEMITKI_CONFIG.api_port == undefined) {
    return "//" + SEMITKI_CONFIG.api_url + "/" + resource + "/";
  } else {
    return "//" + SEMITKI_CONFIG.api_url + ":" + SEMITKI_CONFIG.api_port + "/" + resource + "/";
  }
};
