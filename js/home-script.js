$(document).ready(function(){

    //brand scroll change
    $(window).scroll(function() {
        if (($(document).scrollTop() > 100) | ($(window).width() < 800)){
            $(".navbar").addClass("minimized");
            $("#brand-img").attr("src", "images/img-logo.jpeg");
        } else {
            $(".navbar").removeClass("minimized");
            $("#brand-img").attr("src", "images/img-name.jpg");
        }
    });

    //date click
    $(".date").click(function(){
        var date_val = $(this).text();
        console.log(date_val);
    });

    //change month
    $(".next").click(function(){
        $("#month").text("February");
        $("#month span").text("2017");
    });

});
