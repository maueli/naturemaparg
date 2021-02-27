






$(document).ready(function(){
  $("#list1").mouseover(function(){
    $("#list1").css("background-color", "grey");
  });
  $("#list1").mouseout(function(){
    $("#list1").css("background-color", "black");
  });
});


$(function() {
	$("#list").hide(300).show(500);
});

$(function() {
	$("#list1").on("click",function(){
		$("#list1").css("background-color","red");
	})

});





$(function(){
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 100 ) {
			$(".menu").addClass("fondo")  ;
        }
		else {$(".menu").removeClass("fondo")}
    });
});
