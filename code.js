$(document).ready(function() {

    // array of musicians that always stay at the top of the HTML page
    var musicTopics = ["St. Vincent", "Billy Joel", "The Strokes", "Talking Heads"]
    // empty array that will be filled with 'favorited' artistss
    var favoriteMusicians = [];
    
    // on page load: check if local storage is empty
    // if it's empty --> do not add divs
    // if the favorite button is pressed, local storage is updated, check local storage, local storage is not empty, divs are added
    // if it is not empty, add divs + content
    // if the clear favorites button is pressed, local storage is removed, check to see if local storage is empty --> clear divs
    
    // global variables
    var $this;
    var musicInfo;
    var localFavorites;
    
    // hides parts of the page initially
    $("#addMoreGifs, #addTopicFavorites, #clearButton, #gif-container, #musicButtons-container, #addingButtons-container, #favorites-html").hide();
    
    // hides banner and shows website functionality after 'continue' has been clicked
    $(document).on("click", "#continue", function () {
        $(".container-fluid").hide();
        $("#gif-container, #musicButtons-container, #addingButtons-container, #favorites-html").show();
    })
    
    // adds the static musician buttons at the top of the page
    function addButton () {
        for (var i = 0; i < musicTopics.length; i++) {
            var newButton = $("<button>");
            newButton.attr("class", "btn music-btn");
            newButton.attr("data-name", musicTopics[i]);
            newButton.text(musicTopics[i]);
            $("#musicButtons-container").append(newButton);
        }
    }
    
    addButton();
    
    // adds dynamic buttons, as indicated by user input in the form
    $("#add-music").on("click", function(){
        var addition = $("#music-input").val().trim();
        musicTopics.push(addition); 
        $("#musicButtons-container").empty();
        addButton();
        return false;
    });
    
    // shuffles the array - code from:
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
    
    function topTracks () {
        var token = "BQAPkEXZyFIzRsv9O7DJacaWsaIMlNwL5seSK5Qonzbki6CYco3acR_KwAff1UKDOB5g8ZrgccO2Pki0JeyCLKu0b8CxgjYj2UMK_0di5z20Uj85AdxAf02vg_lwr5dYcGZT1KgJe0Ye8Wt_RQ";
        var queryURL = 'https://api.spotify.com/v1/search?type=artist&query=' + favoriteMusicians[favoriteMusicians.length-1];
        
        $.ajax({
            method: "GET",
            url: queryURL,
            headers: {
              Authorization: 'Bearer ' + token,
            }
          })
          .then( function(response) {
            var recentFave = response.artists.items[0];
            $("#favorites-container").append(recentFave.genres[0]);
          })  
    }
    
    // displays music gifs in the container
    function displayMusicGIFS () {
        musicInfo = $this.attr("data-name");
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
                for (var i = 0; i < 10; i++) {
                    randomArray.push(i);
                }
                // shuffles the array
                randomArray = shuffle(randomArray);
    
                // adds a new card for each index in the shuffled array
                for (var i = 0; i < randomArray.length; i++){
                    var randomNum = randomArray[i];
                    var imgTag = $("<img>");
                    imgTag.attr("class", "gif");
                    imgTag.attr("src", results[randomNum].images.fixed_height_still.url);
                    imgTag.attr("data-still", results[randomNum].images.fixed_height_still.url)
                    imgTag.attr("data-animate", results[randomNum].images.fixed_height.url)
                    imgTag.attr("state", "still");
    
                    var cardTag = $("<div class='card'>").append(imgTag);
                    cardTag = cardTag.append($("<div class='card-body'><p class='card-text'> GIF Rating: " + results[randomNum].rating + "</p></div>"))
                    // + "<br>Title: " + results[randomNum].title + 
                    $("#gif-container").prepend(cardTag);
                }
            })
    
    }
    
    // ON-CLICK FUNCTIONS:
    
    // displays gifs and shows gif-related buttons when an artist button is clicked
    $(document).on("click", ".music-btn", function() {
        $this = $(this);
        $("#addMoreGifs, #addTopicFavorites, #clearButton").show(); 
        $("#gif-container").empty();
        displayMusicGIFS()
    })
    
    // alternates gifs between still and animated states
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
    
    
    // gif-related button that adds more gifs to the page
    $(document).on("click", "#addMoreGifs", function() {
        displayMusicGIFS()
    })
    
    // gif-related button that clears gifs from page
    $(document).on("click", "#clearButton", function() {
        $("#gif-container").empty();
    })
    
    // updates favoriteMusicians array
    function updateFaveArray () {
        // only adds favorite if not already in array
        if (!favoriteMusicians.includes(musicInfo)) {
            favoriteMusicians.push(musicInfo);
        }
        // updates local storage
        updateLocal();
    }
    
    function updateLocal () {
        localStorage.setItem("faveList", JSON.stringify(favoriteMusicians));
    }
    
    function getLocalStorage () {
        localFavorites = JSON.parse(localStorage.getItem("faveList"));
        favoriteMusicians = localFavorites;
    }
    
    getLocalStorage();
    
    function addDivs (array) {
        for (var i = 0; i < favoriteMusicians.length; i++) {
            // Create a new variable that will hold a "<p>" tag.
            // Then set the to-do "value" as text to this <p> element.
            var newDiv = $("<div class='row'>");
            var newCol = $("<div class='col-12'>");
            var pTag = $("<p>");
            pTag.text(favoriteMusicians[i]);
            newCol.append(pTag);
            newDiv.append(newCol);
            $("#addingNewFavorites").append(newDiv);
        }
    } 
    
    addDivs(favoriteMusicians);
    
    
    // updates saved favorites
    $(document).on("click", "#addTopicFavorites", function() {
        updateFaveArray();
    
        // gets updated favorites list from local storage
        getLocalStorage();
        favoriteMusiciansStr = favoriteMusicians.join(", ");
    
        // displays saved favorites and most-recent favorite on page
        $(".saved-container").empty().append(favoriteMusiciansStr);
        $("#recentFavorite").empty().append(favoriteMusicians[favoriteMusicians.length-1])
       
    })
    
    //  gif-related button that adds more gifs to the page
    $(document).on("click", "#clearFaves", function() {
        localStorage.clear();
        favoriteMusicians = [];
        $(".saved-container, #recentFavorite").empty();
    })
    
    savedFavorites();
    
    
    function savedFavorites () {
        if (localStorage.getItem("faveList") === null) {
            console.log("Local storage empty");
        }
        else {
            // favoriteMusicians = JSON.parse(localStorage.getItem("faveList"));
            getLocalStorage();
            favoriteMusiciansStr = favoriteMusicians.join(", ");
            $(".saved-container").append(favoriteMusiciansStr);
        }
    }
    
    // function addFavoriteMusician () {
    //     // musicInfo = $this.attr("data-name");
    //     // var randomOffset = Math.floor(Math.random() * 100)
    //     var queryURL = "https://api.giphy.com/v1/gifs/search?q=music&q=" +
    //         musicInfo + "&api_key=jbVjecxyl97zlwipqSEjHVb4NqK2PG5d";
    
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //         })
    //         .then(function(response) {
    //             var results = response.data;
    //             // var imgTag = $("<img>");
    //             // var randomSticker = Math.floor(Math.random() * 25)
    //             // imgTag.attr("src", results[randomSticker].images.fixed_height.url);
    //             // favoriteGifs.push(imgTag);
    //             // $("#favorites-container").prepend(favoriteGifs);
    //         })
    //     }
    
    });