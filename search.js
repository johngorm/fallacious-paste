// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

var videoIDArray = [];
// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: encodeURIComponent($('#query').val()).replace(/%20/g, '+'),
    maxResults: 8,
    order: 'relevance',
    type: 'video',
    part: 'snippet',
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response.result);
    
    for(var ii = 0; ii < 8 ; ii++){
      postVideo(response.result.items[ii].id.videoId);
    }
  
   
  });
}


function postVideo(videoID){
  var videoURL = 'https://www.youtube.com/embed/' + videoID;
  var ytVideo = $('<iframe width="560" height="315" frameborder="0" allowfullscreen> </iframe>')
                  .prop('src',videoURL)
                  .appendTo('#search-container');
  return;
                    

}


function init() {
  gapi.client.setApiKey('AIzaSyAu70PyyTh926FvpI8pjJsLAVU5QWJaA2A');
  gapi.client.load('youtube', 'v3', function(){
    //YT api is read
     handleAPILoaded();
  });
 
    
}
