$(document).ready(function() {
  // multiselect customization
  $(".multiple-checkboxes").multiselect({
    includeSelectAllOption: true,
  });

  // parsing user preferences 
  $("#preferences").on("submit", function (event){   
    const fragranceFormat = $("#fragrance-format");
    const scentPortfolio = $("#scent-portfolio");
    const errorMessage = $("#error-message");

    let valid = true;  
    let message = "";

    if (fragranceFormat.length === 1){ 
      message += "Please select at least one fragrance format before submitting.<br>"; 
      valid = false;
    }
    if (scentPortfolio.length === 1){
      message += "Please select at least one scent portfolio before submitting.<br>";
      valid = false;
    } 
    if (!valid){ 
      event.preventDefault(); 
      errorMessage.html(message); 
      errorMessage.css("display", "block");
    }
    else{
      errorMessage.css("display", "none");
    }
  });
});