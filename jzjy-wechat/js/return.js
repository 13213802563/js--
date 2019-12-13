$(function () {  

	$("#notice").on("click",function(){
		window.location.href="insure-details.html"
	})
	$('#lo_left').on("click",function(){
        //window.history.back(-1);
        self.location=document.referrer
    })
 });
