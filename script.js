$(document).ready(function () {
  $("#searchform").on({
    keyup: function (k) {
      // console.log(k.keyCode);
      if (k.keyCode == 13) {
        getQuery();
      }
    },
  });

  displayInfo();
});

// Function for the Movie AJAX call
function getQuery() {
  var userInput = $("#searchform").val();
  console.log(userInput, "userInput");

  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "01ffbb8da2fd6602cdd44efd6176f669",
      query: userInput,
      language: "it-IT",
    },
    success: function (data) {
      $("#searchform").val(" ");
      var movies = data.results;
      console.log(movies);
      displayMovies(movies);
    },
    error: function (error) {
      alert("There is an error");
    },
  });

    // Function for the TV Series AJAX call

  $.ajax({
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
      api_key: "01ffbb8da2fd6602cdd44efd6176f669",
      query: userInput,
      language: "it-IT",
    },
    success: function (data) {
      $("#searchform").val(" ");
      var tvshows = data.results;
      displayTVShows(tvshows);
    },
    error: function (error) {
      alert("There is an error");
    },
  });
}

//  Display the Movies 
  function displayMovies(movies) {
    var target = $(".target");
  
    var htmlTemplate = $("#movie-template").html();
  
    var template = Handlebars.compile(htmlTemplate);
  
    var title, original;
  
    for (i = 0; i < movies.length; i++) {
      const movie = movies[i];
      context = {
        imglink: createPoster(movie.poster_path),
        title: movie.title,
        type: movie.type,
        original: movie.original_title,
        language: movie.original_language,
        // flag: flags(movie.original_language),
        rating: movie.vote_average,
        stars: stars(movie.vote_average),
      };
  
      var html = template(context);
      target.append(html);
    }
  }

// Display TV Series
function displayTVShows(tvshows) {
  var target2 = $(".target2");

  var htmlTemplate = $("#movie-template").html();

  var template = Handlebars.compile(htmlTemplate);

  var title, original;

  for (i = 0; i < tvshows.length; i++) {
    const tvshow = tvshows[i];
    context = {
      imglink: createPoster(tvshow.poster_path),
      title: tvshow.title,
      type: tvshow.type,
      original: tvshow.original_title,
      language: tvshow.original_language,
      // flag: flags(tvshow.original_language),
      rating: tvshow.vote_average,
      stars: stars(tvshow.vote_average),
    };

    var html = template(context);
    target2.append(html);
  }
}

function createPoster(posterPath) {
  var poster = "https://image.tmdb.org/t/p/w154";

  if (posterPath == null) {
    poster =
      "https://fontmeme.com/permalink/200918/4937b74c6317b36c509baa13669b4b20.png";
  } else {
    poster += posterPath;
  }

  return poster;
}

function stars(rating) {
  // We divide the rating by two to make it out of 5
  rating = Math.floor(rating / 2);

  // Create an empty variable to house the stars
  var result = "";

  // A loop that loops 5 rounds because I need 5 stars
  for (var i = 1; i <= 5; i++) {
    // An if statement to determine wether I need a whole star or an empty one
    // If i is less than or equal to the rating returned, then it adds a whole star every turn
    if (i <= rating) {
      result = result + '<i class="fas fa-star"></i>';

      // If not, it adds a blank star
    } else {
      result = result + '<i class="far fa-star"></i>';
    }
  }
  // We return the result to be able to use it outside of the function
  return result;
}

function displayInfo() {
  $(document).on("mouseenter", ".movie", function () {
    $(this).find(".movie-info").removeClass("hidden");
  });
  $(document).on("mouseleave", ".movie-info", function () {
    $(this).addClass("hidden");
  });
}
