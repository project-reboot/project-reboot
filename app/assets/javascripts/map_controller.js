var GoogleMapsController = {
  // asynchronously load the google map script tags
  loadScript: function() {
    this.mapContainer = this.getMapContainer();

    // proceed only if map container is present
    if (!this.mapContainer) return;

    var developerKey = 'AIzaSyBI8zvOZE_SUtXjyMgXTdZk-gecQ24jJWY';
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js' +
                 '?key=' + developerKey + '&sensor=false' +
                 '&callback=initializeMap';
    // google maps callback must be defined globally
    window.initializeMap = function() {
      GoogleMapsController.initialize();
    };
    document.body.appendChild(script);
  },

  getMapContainer: function() {
    return document.getElementById('map-container');
  },

  initialize: function() {
    this.renderMap();
    this.setDefaultLocation();
  },

  renderMap: function(mapContainer) {
    var mapOptions;

    mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    GoogleMapsController.map = new google.maps.Map(this.mapContainer, mapOptions);
  },

  renderMarker: function(latitude, longitude, title) {
    var position, marker;

    position = new google.maps.LatLng(latitude, longitude);

    marker = new google.maps.Marker({
      position: position,
      map: GoogleMapsController.map,
      animation: google.maps.Animation.DROP,
      title: title
    });
  },

  centerUserMap: function(latitude, longitude) {
    var position, marker;

    position = new google.maps.LatLng(latitude, longitude);
    title = 'Your approximate location';

    GoogleMapsController.map.setCenter(position);
    GoogleMapsController.renderMarker(latitude, longitude, title);
  },

  setDefaultLocation: function() {
    navigator.geolocation.getCurrentPosition(GoogleMapsController.onGeolocationSuccess,
                                             GoogleMapsController.onGeolocationFailure);
  },

  handleNoGeolocation: function(errorFlag) {
    // UCSF coordinates
    GoogleMapsController.centerUserMap(37.784889221, -122.438926697);
  },

  onGeolocationSuccess: function(pos) {
    var latitude, longitude;
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;

    GoogleMapsController.centerUserMap(latitude, longitude);
    GoogleMapsController.getNearByUsers(latitude, longitude);
  },

  onGeolocationFailure: function(error) {
    var deferred;

    deferred = $.ajax({
      url: '/api/locate',
      dataType: 'json'
    });

    deferred.done(function(geocoderResults) {
      GoogleMapsController.centerUserMap(geocoderResults.data.latitude,
                                         geocoderResults.data.longitude);
    });

    deferred.fail(GoogleMapsController.handleNoGeolocation);
  },

  getNearByUsers: function(latitude, longitude) {
    var deferred;

    deferred = $.ajax({
      url: '/api/nearby_users',
      data: { 'coords': [latitude, longitude] },
      dataType: 'json'
    });

    deferred.done(function(results) { GoogleMapsController.renderNearByUsers(results); });
    // TODO: deal with failure
    deferred.fail(function() { alert('Could not reach server'); });
  },

  renderNearByUsers: function(users) {
    var i, length, user;

    for (i = 0, length = users.length; i < length; i++) {
      user = users[i];
      GoogleMapsController.renderMarker(user.latitude, user.longitude);
    }
  }
};

$(function(){
  GoogleMapsController.loadScript();
});
