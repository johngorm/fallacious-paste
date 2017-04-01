// Initialize Firebase
    var neighArray = [];
    var config = {
      apiKey: "AIzaSyDB3oO0W-easjAy-cE8qACAjaKOWUpbsbs",
      authDomain: "chicago-neighborhoods.firebaseapp.com",
      databaseURL: "https://chicago-neighborhoods.firebaseio.com",
      storageBucket: "chicago-neighborhoods.appspot.com",
      messagingSenderId: "101601892763"
    };

    var ref;
    
    firebase.initializeApp(config);
    function firebaseAdd() {
     
      var database = firebase.database();
      ref = database.ref();
      var userRef;
        if (!localStorage.getItem('userId')) {
            //Add a new user to database
            userRef = ref.push();
            userRef.set({
                neighborhoods: 'blank'
            });
            //When new user added, save their data in localStorage
            ref.on('child_added', function(snapshot) {
                localStorage.setItem('userId', snapshot.key);
                localStorage.setItem('neighborhoods', JSON.stringify(snapshot.val()['neighborhoods']));


            });
        }
     
    }
    // //make the selector the links in the dropdown menu
    // $('button.neighborhood').on('click', function() {
    //     var flag = false;
    //     var neighborhood = this.innerHTML;
    //     localneigh = JSON.parse(localStorage.getItem('neighborhoods'));
    //     console.log(localneigh);
    //     if (localneigh !== 'blank' && localneigh) {
    //         for (ii = 0; ii <= localneigh.length; ii++) {
    //             if (localneigh[ii] === neighborhood) {
    //                 flag = true; //set flag is neighborhood clicked is already in database array
    //                 break;
    //             }

    //         }


    //     }
    //     if (flag === false) {
    //         neighArray.push(neighborhood);
    //         userRef = ref.child(localStorage.getItem('userId'));
    //         userRef.set({
    //             neighborhoods: neighArray
    //         });



    //         userRef.on('value', function(snapshot) {
    //             localStorage.setItem('neighborhoods', JSON.stringify(snapshot.val()['neighborhoods']));
    //         })
    //     }
    //   }

//This is the search.js in the gh-pages branch


function handleAPILoaded() {
  $('.neigh-list').attr('hidden', false);
}

var videoIDArray = [];
var maxVids = 10;

$('.clickDiv').on('click',function() {
  $('#search-container').empty();
  search(this.innerText);

})


$('.neigh-list').delegate('.neighborhood', 'click',function(e) {
  e.preventDefault();
  $('#search-container').empty();
   var flag = false;
    var neighborhood = this.innerHTML;
    localneigh = JSON.parse(localStorage.getItem('neighborhoods'));
    console.log(localneigh);
    if (localneigh !== 'blank' && localneigh) {
        for (ii = 0; ii <= localneigh.length; ii++) {
            if (localneigh[ii] === neighborhood) {
                flag = true; //set flag is neighborhood clicked is already in database array
                break;
            }

        }


    }
    if (flag === false) {
        neighArray.push(neighborhood);
        userRef = ref.child(localStorage.getItem('userId'));
        userRef.set({
            neighborhoods: neighArray
        });



        userRef.on('value', function(snapshot) {
            localStorage.setItem('neighborhoods', JSON.stringify(snapshot.val()['neighborhoods']));
        })
    }
  search(this.innerText);
});


function search(searchTerm){
  $('#search-container').empty();
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
};
 