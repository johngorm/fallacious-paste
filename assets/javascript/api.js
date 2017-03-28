var latlng = {};

      navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var map = new google.maps.Map(document.getElementById('google-map'), {
          zoom: 10,
          center: {lat: 41.8781, lng: -87.669}
          });
          var geocoder = new google.maps.Geocoder;
          var infowindow = new google.maps.InfoWindow;

          latlng = pos

          geocodeLatLng(geocoder, map, infowindow);
      })

      function geocodeLatLng(geocoder, map, infowindow) {
        
        geocoder.geocode({'location': latlng}, function(results, status) {
          console.log(results[0].address_components[2].long_name)
           console.log(results)
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(10);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[0].address_components[2].long_name);
              infowindow.open(map, marker);

              
              // Setting the coordinates for the neighborhood boundary
              var neighBound = [
                {lat: results[3].geometry.bounds.f.b, lng: results[3].geometry.bounds.b.b},
                {lat: results[3].geometry.bounds.f.b, lng: results[3].geometry.bounds.b.f},
                {lat: results[3].geometry.bounds.f.f, lng: results[3].geometry.bounds.b.f},
                {lat: results[3].geometry.bounds.f.f, lng: results[3].geometry.bounds.b.b},
                {lat: results[3].geometry.bounds.f.b, lng: results[3].geometry.bounds.b.b}
              ];
              
              // Drawing the coordinates of the neighborhood boundary
              var neighBound = new google.maps.Polyline({
                path: neighBound,
                geodesic: true,
                strokeColor: 'blue',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });

              // Creating the neighborhood boundary map
              neighBound.setMap(map);

              var historicalOverlay;

              var imageBounds = {
                north: 42.023131,
                south: 41.6443349,
                east: -87.523661,
                west: -87.94026689999998
              };

              var overlayOpts = {
                opacity:.6
              }

              historicalOverlay = new google.maps.GroundOverlay(
              'assets/images/chicago.png',
              imageBounds, overlayOpts);
              
              // Attach image to map using imageBounds coordinates
              historicalOverlay.setMap(map);

            } else {
              window.alert('No results found');
            }

          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

      $("button").on("click", function(event) {

      // event.preventDefault();
      console.log("clicked")
        
        var map = new google.maps.Map(document.getElementById('google-map'), {
          zoom: 10,
          center: {lat: 41.8781, lng: -87.669}
        });
        var geocoder = new google.maps.Geocoder();
        // console.log(geocoder)
        var address = ("chicago" + $(this).attr("value"));
        // document.getElementById('chicagowickerpark').addEventListener('click', function() {
          geocodeAddress(geocoder, map, address);
        // });
      
        function geocodeAddress(geocoder, resultsMap, address) {
        
        console.log(address, "this")
        geocoder.geocode({'address': address}, function(results, status) {
          console.log("results", results)
          if (status === 'OK') {
            resultsMap.setCenter({lat: 41.8781, lng: -87.669});
            
            var neighBound = [
                {lat: results[0].geometry.bounds.f.b, lng: results[0].geometry.bounds.b.b},
                {lat: results[0].geometry.bounds.f.b, lng: results[0].geometry.bounds.b.f},
                {lat: results[0].geometry.bounds.f.f, lng: results[0].geometry.bounds.b.f},
                {lat: results[0].geometry.bounds.f.f, lng: results[0].geometry.bounds.b.b},
                {lat: results[0].geometry.bounds.f.b, lng: results[0].geometry.bounds.b.b}
              ];
              
              // Drawing the coordinates of the neighborhood boundary
              var neighBound = new google.maps.Polyline({
                path: neighBound,
                geodesic: true,
                strokeColor: 'blue',
                strokeOpacity: 1.0,
                strokeWeight: 2
              });

              // Creating the neighborhood boundary map
              neighBound.setMap(map);

              var imageBounds = {
                north: 42.023131,
                south: 41.6443349,
                east: -87.523661,
                west: -87.94026689999998
              };

              var overlayOpts = {
                opacity:.6
              }

              historicalOverlay = new google.maps.GroundOverlay(
                  'assets/images/chicago.png',
                  imageBounds, overlayOpts);
              
              historicalOverlay.setMap(map);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
  });
