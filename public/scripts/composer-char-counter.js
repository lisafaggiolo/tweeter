


$(document).ready(() => {
  
  
  $("#tweet-text").on("keydown", () => {
    //console.log($('#tweet-text').val().length)
    let charLeft = 140 - $('#tweet-text').val().length;

    $(".counter").text(charLeft);
    if (charLeft < 0) {
      $(".counter").addClass("errCounter");

    } else {
      $('.counter').removeClass('errCounter');
    }
  
  });

  $("#button").on("click", () => {

    $('.counter').text(140).removeClass('errCounter');
  });

});
