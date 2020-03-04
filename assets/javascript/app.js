var musicTopics = ["Annie Clark", "Billy Joel", "The Strokes", "The Crystals"]

function addButton () {
    for (var i = 0; i < musicTopics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("class", "btn btn-primary music-btn");
        newButton.attr("data-name", musicTopics[i]);
        newButton.text(musicTopics[i]);
        $("#musicButtons-container").append(newButton );
    }
}

addButton();