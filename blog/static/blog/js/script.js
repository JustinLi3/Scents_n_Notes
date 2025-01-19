$(document).ready(function() {
  // multiselect customization
  $(".multiple-checkboxes").multiselect({
    includeSelectAllOption: true,
  });

  // parsing user preferences 
  $("#preferences").on("submit", function (event){   
    let email = $("#preference-email").val();
    let fragranceType = "Fragrance Type: " + $("#fragrance-type").val() + " ";
    let fragranceFormat = "";
    let scentPortfolio = "";  
    let additionalComments = 

    // Error message to return to user 
    const errorMessage = $("#error-message"); 
    // Manual validation
    let valid = true;  
    // Message back to error
    let message = ""; 


    //For each option selected for each multiselector, append the value
    $("#fragrance-format").find('option:selected').each(function(index, element){ 
      fragranceFormat += (element.value+", ");
    }); 

    $("#scent-portfolio").find('option:selected').each(function(index, element){ 
      scentPortfolio += (element.value+", ");
    }); 

    //Check whether either were selected, otherwise start prompt
    if (!fragranceFormat){
      message += "Please select at least one fragrance format before submitting.<br>"; 
      valid = false;
    }
    else{  
      fragranceFormat = fragranceFormat.slice(0,-2);
      fragranceFormat = "Fragrance Format(s): " + fragranceFormat;
    } 

    if (!scentPortfolio){
      message += "Please select at least one scent portfolio before submitting.<br>"; 
      valid = false;
    }
    else{
      scentPortfolio = scentPortfolio.slice(0,-2);
      scentPortfolio = "Fragrance Portfolio(s): " + scentPortfolio;
    } 
    alert(email);
    alert(fragranceType);
    alert(fragranceFormat);
    alert(scentPortfolio);

    if (!valid){ 
      event.preventDefault(); 
      errorMessage.html(message); 
      errorMessage.css("display", "block");
    }
    else{ 
      event.preventDefault(); 

      errorMessage.css("display", "none");
    }
  });
});