// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
  
//     return array;
//   }

// function displayGIFS () {
//     var musicInfo = $this.attr("data-name");
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         musicInfo + "&api_key=jbVjecxyl97zlwipqSEjHVb4NqK2PG5d";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//         })
//         .then(function(response) {
//             var results = response.data;
//             var randomArray = [];

//             for (var i = 0; i < 25; i++) {
//                 randomArray.push(i);
//             }
//             randomArray = shuffle(randomArray);
//             randomArray = randomArray.splice(0, 10);

//             for (var i = 0; i < randomArray.length; i++){
//                 var randomNum = randomArray[i];
//                 var imgTag = $("<img>");
//                 imgTag.attr("src", results[randomNum].images.fixed_width.url);
//                 $("#gif-container").append(imgTag);
//             }
//         })

// }

// $(document).on("click", ".music-btn", function() {
//     $this = $(this);
//     $("#gif-container").empty();
//     // displayGIFS()
// })
