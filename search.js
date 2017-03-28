
function saveUserName(){
  userName = $('#uname').val();
  localStorage.setItem('userName', userName);
    $('#id01').css('display', 'none');

  
}

function handleAPILoaded() {
  $('.neigh-list').attr('hidden', false);
}

var videoIDArray = [];
var maxVids = 10;

$('.clickDiv').on('click',function() {
  $('#search-container').empty();
  search(this.innerText);

})


$('.neigh-list').delegate('button', 'click',function(e) {
  e.preventDefault();
  $('#search-container').empty();
  search(this.innerText);
});


function search(searchTerm){
  var val = 'Chicago ' + searchTerm;
  var request = gapi.client.youtube.search.list({
    q: encodeURIComponent(val).replace(/%20/g, '+'),
    maxResults: maxVids,
    order: 'relevance',
    type: 'video',
    part: 'snippet'
  })

  request.execute(function(response) {
    videoIDArray = [];
    for(var ii = 0; ii < maxVids; ii++){
      videoIDArray.push(response.result.items[ii].id.videoId);
    }

    var randVideoID = videoIDArray[Math.floor(Math.random()*10)];
    postVideo(randVideoID);
  })
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
