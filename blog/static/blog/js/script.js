$(document).ready(function() {

  // multiselect customization
    $(".multiple-checkboxes").multiselect({
      includeSelectAllOption: true,
    });

  // parsing user preferences 
  $("#preferences").on("submit", function (event){ 
    alert("Handler Called!");
    event.preventDefault();
  })
});