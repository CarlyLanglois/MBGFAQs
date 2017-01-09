// all the stuff we need to keep track of
var member_model = {

    first_name: "",

    last_name: "",

    address: "",

    phone: "",

    email: ""

}

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


    $("#calendar").fullCalendar({
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

    $("#calendar-container").hide();

    $("#navbar-login-btn").click(renderLogin)

    $("#navbar-logout-btn").click(renderLogin)

    $("#login_form").submit(login)

    $("#join_start").click(join_start)

    $("#join_form").submit(join_submit)

    $("#home-faqs-btn").click(toggleFAQs)

    $("#home-events-btn").click(toggleCalendar)

});


//called when the user clicks the navbar login or logout buttons,
// brings the user to the login/sign up page
function renderLogin(event) {

    event.preventDefault();

    setLoggedInStatus(false);

};

function login(event) {

    event.preventDefault();

    //grab member id
    var member_id = $("#login_form input[name=member_id]").val();

    //validate member id
    if (member_id != "12345"){
        // if not valid, show error message
        $(".alert").attr("hidden", false);
    } else {
        // if valid, hide login section and show member home section
        setLoggedInStatus(true);
    }

};

function join_start(event) {

    event.preventDefault();

    //hide login and home sections, display join section
    $("#login_section").attr("hidden", true);
    $("#member_home_section").attr("hidden", true);
    $("#join_section").attr("hidden", false);
};

function join_submit(event) {

    event.preventDefault();

    //on submit, display member home section
    setLoggedInStatus(true);

};

function setLoggedInStatus(isLoggedIn){
    $("#member_home_section").attr("hidden", !isLoggedIn);
    $("#login_section").attr("hidden", isLoggedIn);
    $("#join_section").attr("hidden", isLoggedIn);
};

function toggleFAQs(event) {

    event.preventDefault();

    $("#faqs-section").toggle();
}

function toggleCalendar(event) {

    event.preventDefault();

    $("#calendar-container").toggle();

};

    //grab info from join form
    /*
    var first_name = $("#join_form input[name=first_name]").val();
    var last_name = $("#join_form input[name=last_name]").val();
    var address = $("#join_form input[name=address]").val();
    var phone = $("#join_form input[name=phone]").val();
    var email = $("#join_form input[name=email]").val();

    var member_array = [first_name, last_name, address, phone, email];

    function isValidInput(input){
        if (input != ""){
            return false;
        } else {
            return true;
        }
    }

    function isValidForm(){
        if (member_array.every(isValidInput)){
            $("#member_home_section").attr("hidden", false);
            $("#join_section").attr("hidden", true);
        } else {
            $(".alert").attr("hidden", false);
        }
    }
    */

    //member_model.first_name = first_name;
