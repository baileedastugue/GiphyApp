$(document).ready(function() {

var musicTopics = ["St. Vincent", "Billy Joel", "The Strokes", "Talking Heads"]
var $this;
$("#addMoreGifs").hide();

function addButton () {
    for (var i = 0; i < musicTopics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("class", "btn btn-primary music-btn");
        newButton.attr("data-name", musicTopics[i]);
        newButton.text(musicTopics[i]);
        $("#musicButtons-container").append(newButton);
    }
}

addButton();

$("#add-music").on("click", function(){
    var addition = $("#music-input").val().trim();
    musicTopics.push(addition); 
    $("#musicButtons-container").empty();
    addButton();
    return false;
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function displayMusicGIFS () {
    var musicInfo = $this.attr("data-name");
    var randomOffset = Math.floor(Math.random() * 100)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=music&q=" +
        musicInfo + "&offset=" + randomOffset + "&api_key=jbVjecxyl97zlwipqSEjHVb4NqK2PG5d";

    $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            var results = response.data;
            var randomArray = [];
            // var resultsReturned = response;
            // var totalReturned = (response.pagination.total_count); 

            for (var i = 0; i < 10; i++) {
                randomArray.push(i);
            }
            randomArray = shuffle(randomArray);
            // randomArray = randomArray.splice(0, 10);

            for (var i = 0; i < randomArray.length; i++){
                var randomNum = randomArray[i];
                var imgTag = $("<img>");
                imgTag.attr("src", results[randomNum].images.fixed_height_still.url);
                imgTag.attr("data-still", results[randomNum].images.fixed_height_still.url)
                imgTag.attr("data-animate", results[randomNum].images.fixed_height.url)
                imgTag.attr("state", "still");
                imgTag.attr("class", "gif");
                $("#gif-container").prepend(imgTag);
            }
        })

}

$(document).on("click", ".gif", function() {
    if ($(this).attr("state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("state", "still");
    }
})

$(document).on("click", ".music-btn", function() {
    $this = $(this);
    $("#addMoreGifs").show(); 
    $("#gif-container").empty();
    displayMusicGIFS()
})

$(document).on("click", "#addMoreGifs", function() {
    displayMusicGIFS()
})

});