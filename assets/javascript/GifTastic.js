$(document).ready(function() {
  var topics = ["game of thrones", "walking dead", "disney", "pixar", "rurouni kenshin", "denver broncos", "golden state warriors", "better call saul", "breaking bad"];
  // var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC"

  function displayTopicInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log('got data from api ' + response);
      for (i = 0; i < 10; i++){
        // converting object into json string
        $('#topic-view').prepend(JSON.stringify(response));
        var topicDiv = $('<div class="topicData">');
        var gifURL = response.data[i].images.fixed_height.url;
        var image = $('<img>').attr('src', gifURL);
        topicDiv.append(image);
        var rating = response.data[i].rating;
        console.log(response.data[i].rating);
        var pOne = $('<p>').text('Rating: ' + rating);
        topicDiv.append(pOne);

        $('#topics-view').prepend(topicDiv);

      }
    });
  }
    // Function for displaying topic data
    function renderButtons() {

      // Deletes the topics prior to adding new movies
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Loops through the array of movies
      for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>").addClass("topic").attr("data-name", topics[i]).text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where the add topic button is clicked
    $("#add-topic").on("click", function(event) {
      event.preventDefault();
      // This line of code will grab the input from the textbox
      var topic = $("#topic-input").val().trim();

      // The topic from the textbox is then added to our array
      topics.push(topic);

      // Calling renderButtons which handles the processing of our topics array
      renderButtons();

    });
  $(document).on("click", ".topic", displayTopicInfo);
  renderButtons();

})