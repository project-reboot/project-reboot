var GoogleMapsController = {
  initialize: function() {
    var mapOptions = {
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    GoogleMapsController.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // User has accepted geolocation, find location, and show on map
        function(position) {
          var pos = new google.maps.LatLng(position.coords.latitude,
                                           position.coords.longitude);

          var marker = new google.maps.Marker({
            position: pos,
            map: GoogleMapsController.map,
            animation: google.maps.Animation.DROP,
            title: 'Your approximate location'
          });

          GoogleMapsController.map.setCenter(pos);
        },

        // User has refused geolocation, locate by ip address instead
        function() {
          $.ajax({
            url: '/locate',
            dataType: 'json'
          })
          .done(function(geocoderResults){
            locationData = geocoderResults[0].data;
            // if we have a location
            if(locationData) {
              latitude = locationData.latitude;
              longitude = locationData.longitude;

              var pos = new google.maps.LatLng(latitude, longitude);
              var marker = new google.maps.Marker({
                position: pos,
                map: GoogleMapsController.map,
                animation: google.maps.Animation.DROP,
                title: 'Your approximate location'
              });

              GoogleMapsController.map.setCenter(pos);
            }
          })
          .error(function(){
            // if ip address lookup failed, handle error
            handleNoGeolocation(true);
          });
      });
    }
    else {
      // Browser doesn't support Geolocation
      GoogleMapsController.handleNoGeolocation(false);
    }
  },

  handleNoGeolocation: function(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    }
    else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: GoogleMapsController.map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    GoogleMapsController.map.setCenter(options.position);
  }
};

// asynchronously load the google map
function loadGmapsScript(){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js' +
               '?key=AIzaSyBI8zvOZE_SUtXjyMgXTdZk-gecQ24jJWY&sensor=false' +
               '&callback=drawMap';
  window.drawMap = function(){
    GoogleMapsController.initialize();
  },
  document.body.appendChild(script);
}

$(function(){
  loadGoogleMapsScript();
});
