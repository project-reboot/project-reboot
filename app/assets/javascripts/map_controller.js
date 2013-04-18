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

  initialize: function() {
    this.renderMap();
    this.setDefaultLocation();
  },

  renderMap: function() {
    var mapOption;

    mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    GoogleMapsController.map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
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
    var latitude, longitude;

    latitude = 37.784889221;
    longitude = -122.438926697;

    options = {
      map: GoogleMapsController.map,
      position: new google.maps.LatLng(latitude, longitude),
      content: content
    };

    infoWindow = new google.maps.InfoWindow(options);
    GoogleMapsController.map.setCenter(options.position);
  },

  onGeolocationSuccess: function(pos) {
    GoogleMapsController.centerUserMap(pos.coords.latitude, pos.coords.longitude);
  },

  onGeolocationFailure: function(error) {
    var promise;

    promise = $.ajax({
      url: '/api/locate',
      dataType: 'json'
    });

    promise.done(function(geocoderResults) {
      GoogleMapsController.centerUserMap(geocoderResults.data.latitude,
                                         geocoderResults.data.longitude)
    });

    promise.fail(GoogleMapsController.handleNoGeolocation);
  }
};

$(function(){
  GoogleMapsController.loadScript();
});
