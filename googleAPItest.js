var latlng = {};
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('pos', position)
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: pos
        });
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        latlng = pos
        geocodeLatLng(geocoder, map, infowindow);
      })
//       function initMap() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 8,
//           center: {lat: 40.731, lng: -73.997}
//         });
//         var geocoder = new google.maps.Geocoder;
//         var infowindow = new google.maps.InfoWindow;
// geocodeLatLng(geocoder, map, infowindow);
//         // document.getElementById('submit').addEventListener('click', function() {
//         //   geocodeLatLng(geocoder, map, infowindow);
//         // });
//       }
      function geocodeLatLng(geocoder, map, infowindow) {
        // var input = document.getElementById('latlng').value;
        // var input = "41.8963286,-87.618482";
        // console.log('input', input)
        // var latlngStr = input.split(',', 2);
        // console.log('latlng', latlngStr)
        // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
        geocoder.geocode({'location': latlng}, function(results, status) {
          console.log(results[0].address_components[2].long_name)
           console.log(results)
          if (status === 'OK') {
            if (results[1]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
              var neighborhood = results[0].address_components[2].long_name
              search(neighborhood)
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
        
      }
      
 $("#test").on("click", function(event) {
      event.preventDefault();
      getDetails()
      function getDetails() {
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=Winnetka&key=AIzaSyDGkhDV-uj081dib4lTGyz1aruCYiBWPz0",
            method: "GET"
          }).done(function(response) {
            console.log(response);
          });
      }
});
 // ********
 function handleAPILoaded() {
  $('.clickDiv').attr('hidden', false);
}
var videoIDArray = [];
var maxVids = 10;
$('.clickDiv').on('click',function() {
  $('#search-container').empty();
  search(this.innerText);
})
function search(searchTerm){
 console.log(searchTerm,"name")
  
  // request.execute(function(response) {
  //   videoIDArray = [];
  //   for(var ii = 0; ii < maxVids; ii++){
  //     videoIDArray.push(response.result.items[ii].id.videoId);
  //   }
  //   var randVideoID = videoIDArray[Math.floor(Math.random()*10)];
  //   postVideo(randVideoID);
  // })
}
function postVideo(videoID){
  var videoURL = 'https://www.youtube.com/embed/' + videoID;
  var ytVideo = $('<iframe width="560" height="315" frameborder="0" allowfullscreen> </iframe>')
                  .prop('src',videoURL)
                  .appendTo('#search-container');
  return;
                    
}
