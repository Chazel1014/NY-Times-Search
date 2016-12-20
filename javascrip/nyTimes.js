 // * Front-End Team:
 //        * Begin creating basic click events. Register the submit button

 //        * Create working transfers of data between the text-boxes and the backend.

 //        * Experiment with creating content regions for where the article will go.

 //    * Back-End Team:
 //        * Create the AJAX call needed to retrieve data then console.log all of the relevant fields.

 //        * Incorporate various "optional parameters" (hard code these in initially).

 //        * Take note of various "bugs" that appear with certain searches.

$(document).on("click", "#search-button", function() {
	  var topic = $('#search-term').val().trim();//adds spaces instead of + in queryURL, which breaks it.  	
      var startYear = $('#start-year').val().trim();
      var endYear = $('#end-year').val().trim();
      var limit = $('#num-recs').val().trim();
      // var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + topic + "&begin_date=" + 
      // startYear + "0101&end_date=" + endYear + "0101";

       var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
         queryURL += '?' + $.param({
           'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
           'q': topic
       });  

         if (startYear.length > 0){
            queryURL += $.param({
              'begin_date': startYear + "0101"
            });
         }

         if (endYear.length > 0){
            queryURL += $.param({
              'end_date': endYear + "1231"
            });
         }


      $.ajax({
            url: queryURL,
            method: "GET"
          }).done(function(response) {
            
            console.log(queryURL);
            console.log(response);
            
            var results = response.response.docs;
			
            for (var i = 0; i < limit; i++) {
            	var newsDiv = $('<div>');
            	var newsLink = $("<a>").attr("href", results[i].web_url).attr("target","_blank").text(results[i].web_url);
            	
            	var newsSearch = $("<p>" + results[i].snippet +"</p>");
            	// newsSearch.attr("src", results[i].images.fixed_height.url);
            	// newsSearch.attr("alt",topic);
            	newsDiv.append(newsLink);
             	newsDiv.append(newsSearch);

              $("#news-space").prepend(newsDiv);

            } //close for loop to generate articles
            
        	});// close .done function response
  
  });// Close on click event for button

 //    * All-Together:
 //        * Display the HTML content!

 