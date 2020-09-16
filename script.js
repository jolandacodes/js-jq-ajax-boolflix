
$(document).ready(function () {

    $("#searchform").on({
        keyup: function (k) {
            // console.log(k.keyCode);
            if (k.keyCode == 13) {
                getQuery();
            }
        }
    });

    
});

// Function for the AJAX call
function getQuery() {


    var userInput = $("#searchform").val();
    console.log(userInput, "userInput");
    
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie",
        method: "GET",
        data:{
           api_key: "01ffbb8da2fd6602cdd44efd6176f669",
           query: userInput,
           language:"it-IT"
 
        },
        success: function (data) {
 
         var movies = data.results;
         displayMovies(movies);

        },
        error: function (error) {
           alert('There is an error');
       }
     });
 
}


function displayMovies (movies){

    var target = $('.target');

    var htmlTemplate = $('#template').html();

    var movieTemplate = Handlebars.compile(htmlTemplate);

   movies.forEach(element => {
       
   });



}
