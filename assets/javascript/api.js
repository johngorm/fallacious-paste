$(document).ready(function(){


//   $(".test").on("click", function(){
//     console.log("hello");
//   })
//     console.log("bye")

//     $('.neigh-list').delegate('.neighborhood', 'click',function(e) {
  
//   e.preventDefault();
//   $('#search-container').empty();
//    // var flag = false;
//    //  var neighborhood = this.innerHTML;
//    //  localneigh = JSON.parse(localStorage.getItem('neighborhoods'));
//    //  console.log(localneigh);
//    //  if (localneigh !== 'blank' && localneigh) {
//    //      for (ii = 0; ii <= localneigh.length; ii++) {
//    //          if (localneigh[ii] === neighborhood) {
//    //              flag = true; //set flag is neighborhood clicked is already in database array
//    //              break;
//    //          }

//    //      }


//    //  }
//    //  if (flag === false) {
//    //      neighArray.push(neighborhood);
//    //      userRef = ref.child(localStorage.getItem('userId'));
//    //      userRef.set({
//    //          neighborhoods: neighArray
//    //      });



//    //      userRef.on('value', function(snapshot) {
//    //          localStorage.setItem('neighborhoods', JSON.stringify(snapshot.val()['neighborhoods']));
//    //      })
//    //  }

// console.log(this.innerText)
//   search(this.innerText +);
// });



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
          
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(10);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              
              var neighName = results[0].address_components[2].long_name;
             
              $(".neighName").html(neighName);
              // Setting the coordinates for the neighborhood boundary
              var neighBound = [
                {lat: results[3].geometry.viewport.f.b, lng: results[3].geometry.viewport.b.b},
                {lat: results[3].geometry.viewport.f.b, lng: results[3].geometry.viewport.b.f},
                {lat: results[3].geometry.viewport.f.f, lng: results[3].geometry.viewport.b.f},
                {lat: results[3].geometry.viewport.f.f, lng: results[3].geometry.viewport.b.b},
                {lat: results[3].geometry.viewport.f.b, lng: results[3].geometry.viewport.b.b}
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

      $(".neighborhood").on("click", function(event) {

      event.preventDefault();
      
        var map = new google.maps.Map(document.getElementById('google-map'), {
          zoom: 10,
          center: {lat: 41.8781, lng: -87.669}
        });
        var geocoder = new google.maps.Geocoder();
        
        var address = $(this).attr("value");
       
        geocodeAddress(geocoder, map, address);
        search(address);      

        function geocodeAddress(geocoder, resultsMap, address) {
       
        
        geocoder.geocode({'address': address}, function(results, status) {
          
          if (status === 'OK') {

            var neighName = address;
            $(".neighName").html(neighName);

            resultsMap.setCenter({lat: 41.8781, lng: -87.669});
            
            var neighBound = [
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.b},
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.f},
                {lat: results[0].geometry.viewport.f.f, lng: results[0].geometry.viewport.b.f},
                {lat: results[0].geometry.viewport.f.f, lng: results[0].geometry.viewport.b.b},
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.b}
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
 
 $("#shuffle").on("click", function(event) {

      event.preventDefault();
      
        var map = new google.maps.Map(document.getElementById('google-map'), {
          zoom: 10,
          center: {lat: 41.8781, lng: -87.669}
        });
        var geocoder = new google.maps.Geocoder();
       
        var shuffNeigh =  (neighborhoodList[Math.floor(Math.random() * neighborhoodList.length)]);
        var address = "chicago " + shuffNeigh
        
        $(".neighName").html(shuffNeigh);

        geocodeAddress(geocoder, map, address);
        search(address);
     
        function geocodeAddress(geocoder, resultsMap, address) {

        geocoder.geocode({'address': address}, function(results, status) {
          

          if (status === 'OK') {

            

            resultsMap.setCenter({lat: 41.8781, lng: -87.669});
            
           var neighBound = [
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.b},
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.f},
                {lat: results[0].geometry.viewport.f.f, lng: results[0].geometry.viewport.b.f},
                {lat: results[0].geometry.viewport.f.f, lng: results[0].geometry.viewport.b.b},
                {lat: results[0].geometry.viewport.f.b, lng: results[0].geometry.viewport.b.b}
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
                opacity:10

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

 $("#myLocation").on("click", function(event) {

  event.preventDefault();
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
 });
 
});
    
