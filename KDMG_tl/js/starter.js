$(function () {
  $('.king1').mouseover(function(){
      $(this).append("<div class='king-pop'></div>");
      $(".king-pop").load("king1.html");
    }).mouseout(function(){
      $(".king-pop").remove();
    })

})
