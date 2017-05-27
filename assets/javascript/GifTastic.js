$(document).ready(function() {
  var topics = ["game of thrones", "walking dead", "disney", "pixar", "dragonlance", "rurouni kenshin", "denver broncos", "golden state warriors", "better call saul", "breaking bad"];
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (i = 0; i < response.data.length; i++) {
      var url = response.data[i].images.fixed_height.url;
    $('#container').append($('<img />').attr('src', url));
    }
  });

})