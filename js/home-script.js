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

    $('#calendar').fullCalendar({
        // put your options and callbacks here
        events:[
            {
                title: "Speaker Series: History of the Climatron",
                start: "2017-01-17T11:00:00",
                end: "2017-01-17T12:00:00",
                allDay : false
            },
            {
                title: "Orchid Show Preview",
                start: "2017-02-03T17:30:00",
                end: "2017-02-03T20:30:00",
                allDay: false
            }
        ]
    });

    /*
    //date click
    $(".date").click(function(){
        var date_val = $(this).text();
        console.log(date_val);
    });

    //change month
    $(".next").click(function(){
        $("#month").text("February");
    });

    //months
    var months = {"January" , "February", "March", }
    */

});
