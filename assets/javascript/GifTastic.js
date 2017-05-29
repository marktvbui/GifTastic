$(document).ready(function() {
  var topics = ["pug","game of thrones", "walking dead", "house of cards","disney", "pixar", "rurouni kenshin", "denver broncos", "golden state warriors", "better call saul", "breaking bad", "fresh off the boat", "jet li", "jackie chan"];

  function displayTopicInfo() {
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // console.log('got data from api ' + response);
      for (i = 0; i < 10; i++){
        // converting object into json string
        $('#topic-view').prepend(JSON.stringify(response));
        var topicDiv = $('<div id="topicData">');
        // topicDiv.addClass('topicCount' + i);
        // console.log(topicDiv);
        var gifStill = response.data[i].images.fixed_height_still.url;
        // console.log('still gif ' + gifStill);
        var gifAnimated = response.data[i].images.fixed_height.url;
        // console.log('animated gif ' + gifAnimated);
        var image = $('<img>').attr('src', gifStill).on('click', function(){
          // var gifAnimated = response.data[i].images.fixed_height.url;
          image = $('<img>').attr('src', gifAnimated);
          topicDiv.replaceWith(image);
        });
        // var clickImage = $('<img>')
        // $('.topicData').each(function(index) {
        //   $(this).on('click', function(){
        //     image = $('<img'>).attr('src', gifAnimated);
        //   });
        // });
        topicDiv.append(image);
        var rating = response.data[i].rating;
        // console.log(response.data[i].rating);
        var pRating = $('<p>').text('Rating: ' + rating);
        topicDiv.append(pRating);
        $('#topics-view').prepend(topicDiv);
        // var changeGif = document.getElementById('topicData');
        // changeGif.on('click', function() {
        //   image = $('<img>').attr('src', gifAnimated);
        // });
      }
      // $('.topicData').each(function(index) {
      //   for (i = 0; i < 10; i++) {
      //     $(this).on('click', function(){
      //       image = $('<img>').attr('src', gifAnimated);
      //     });
      //   };
      // });
    });
  }
  // function clickImage(){
  //    $('.topicData').on('click', function(){
  //       image = $('<img>').attr('src', gifAnimated);
  //       topicDiv.replaceWith(image);
  //       console.log('this image was clicked');
  //     })
  // }
  // function clickImage(){
  //   $('.topicData').each(function(image){
  //     $(image).click(function(){
  //       $(this).attr('src', src.replace(gifStill, gifAnimated));
  //     }, function(){
  //       $(this).attr('src', src);
  //     });
  //   });
  // };
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
  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".topic", displayTopicInfo);
  // $(document).on('click', '.topicData', clickImage);
  // Calling the renderButtons function to display the intial buttons
  renderButtons();

})