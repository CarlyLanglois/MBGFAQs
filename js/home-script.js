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

    $("#login_form").submit(login)

});

function login(event) {

    // This prevents the form submission from doing what it normally does:
    //send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request,
    //we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    var member_id = $("#login_form input[name=member_id]").val();
    if (member_id != "12345"){
        $(".alert").attr("hidden", false);
    } else {
        $("#login_section").attr("hidden", true);
        $("#member_home_section").attr("hidden", false);
    }

};

function render() {
    //$(".alert").attr("hidden", isValidated);
};
