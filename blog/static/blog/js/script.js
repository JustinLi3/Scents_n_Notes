$(document).ready(function() { 
  // Initialize Select2 for all relevant elements
  $('.select2').select2({
    placeholder: "Select options",
    allowClear: true
  });

  let recommendations = [];

  // parsing user preferences  
  $("#sendResults").on("click",function(){ 
    // Show spinner on email click 
    $("#spinner").show();
    $("#overlay").show();

    let email = $("#preference-email").val();
    $.ajax({
      url: "/track-click/", // URL of your Django view
      type: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") }, // Include CSRF token
      data: JSON.stringify({
        email: email, 
        recommendations:recommendations
      }), // Send as JSON string
      contentType: "application/json", // Set content type to JSON
      success: function (response) {
        // Hide spinner when the request completes successfully
        $("#spinner").hide();
        $("#overlay").hide();

        alert("Email has been sent to " + email + "!")
      },
      error: function (xhr, status, error) {
        // Hide spinner in case of error
        $("#spinner").hide();
        $("#overlay").hide();

        console.error("Error:", error);
        alert("An error occurred while sending email. Please try again.");  },
    });
  }); 
  
  $("#preferences").on("submit", function (event){  
    event.preventDefault();     
    let email = $("#preference-email").val();
    let fragranceType = "Fragrance Type: " + $("#fragrance-type").val() + " ";
    let personalityTraits = $("#personality-traits").val(); 

    // Error message to return to user 
    const errorMessage = $("#error-message"); 
    // Manual validation
    let valid = true;  
    // Message back to error
    let message = "";  
    $("#sendResults").css("display","none");
    if (email){
      $("#sendResults").css("display","block");
    }  

   // For each option selected for each multiselector, get the selected values directly from Select2
    let fragranceFormat = $("#fragrance-format").select2('data')  // Get selected data from Select2
      .map(item => item.text)  // Extract the text of each selected item
      .join('/');  // Join selected values with '/'

    let scentPortfolio = $("#scent-portfolio").select2('data')
      .map(item => item.text)
      .join('/');

    //Check whether either were selected, otherwise start prompt
    if (!fragranceFormat){
      message += "Please select at least one fragrance format before submitting.<br>"; 
      valid = false;
    }
    else{  
      fragranceFormat = fragranceFormat.slice(0,-2);
      fragranceFormat = "Fragrance Formats: " + fragranceFormat;
    } 

    if (!scentPortfolio){
      message += "Please select at least one scent portfolio before submitting.<br>"; 
      valid = false;
    }
    else{
      scentPortfolio = scentPortfolio.slice(0,-1);
      scentPortfolio = "Fragrance Portfolios: " + scentPortfolio;
    }  

    if (personalityTraits){
      personalityTraits = "Personality Traits: " + personalityTraits;
    }
    if (!valid){ 
      errorMessage.html(message); 
      errorMessage.css("display", "block"); 
      return; //Stop further execution if form is invalid
    }
    errorMessage.css("display", "none");

    let userPreferences = fragranceType + ", " + fragranceFormat + ", " + scentPortfolio + ", " + personalityTraits + ".";
    console.log(userPreferences)

    // SHOW the spinner while waiting for recommendations
    $("#spinner").show();
    $("#overlay").show();

    
    $.ajax({
      url: "/recommend/", // URL of your Django view
      type: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") }, // Include CSRF token
      data: JSON.stringify({userPreferences}), // Send as JSON string
      contentType: "application/json", // Set content type to JSON
      success: function (response) {
        // Hide spinner once the recommendations are received
        $("#spinner").hide();
        $("#overlay").hide();

        recommendations = response.recommendations;   
        // Example of toggling a modal   
        $("#recommendations-list").empty();

        recommendations.map(fragrance => {
          const listItem = $('<li>'); 
          listItem.addClass("my-3 ml-3")
          listItem.text(fragrance);
          $('#recommendations-list').append(listItem);
        });
        $('#preference-modal').modal('show'); 
      },
      error: function (xhr, status, error) {
        // Hide spinner in case of error
        $("#spinner").hide();
        $("#overlay").hide();
        console.error("Error:", error);
        errorMessage.html("An error occurred while submitting your preferences. Please try again.").css("display", "block");
      },
    });
  });
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
});