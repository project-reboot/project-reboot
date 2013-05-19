var GoogleMapsController = {
  // asynchronously load the google map script tags
  loadScript: function() {
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
    var mapContainer = GoogleMapsController.getMapContainer();

    if (mapContainer) {
      this.renderMap(mapContainer);
      this.setDefaultLocation();
    }
  },

  renderMap: function(mapContainer) {
    var mapOption;

    mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    GoogleMapsController.map = new google.maps.Map(mapContainer, mapOptions);
  },

  centerUserMap: function(latitude, longitude) {
    var position, marker;

    position = new google.maps.LatLng(latitude, longitude);
    GoogleMapsController.map.setCenter(position);

    marker = new google.maps.Marker({
      position: position,
      map: GoogleMapsController.map,
      animation: google.maps.Animation.DROP,
      title: 'Your approximate location'
    });
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
    GoogleMapsController.centerUserMap(pos.coords.latitude, pos.coords.longitude);
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
  }
};

$(function(){
  GoogleMapsController.loadScript();
});
