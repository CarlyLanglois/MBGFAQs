// ------------------- MODEL ---------------------------//

// all the stuff we need to keep track of
var member_model = {

    first_name: "",

    last_name: "",

    email: "",

    level: ""

}

// ------------------ VIEW --------------------- //
$(document).ready(function(){

    // ---- NAVBAR: brand image changes when the window scrolls up and down
    $(window).scroll(function() {
        if (($(document).scrollTop() > 100) | ($(window).width() < 800)){
            $(".navbar").addClass("minimized");
            $("#brand-img").attr("src", "images/img-logo.jpeg");
        } else {
            $(".navbar").removeClass("minimized");
            $("#brand-img").attr("src", "images/img-name.jpg");
        }
    });

    //$("#join-form").hide();

    // ----- SIGN UP: validate user data


    // ---- CALENDAR:
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
        ],
        eventClick: function() {
            console.log("this works, ya?!");
        }
    });



    $("#calendar-container").hide();
    //$("#join-form").hide();


    $("#navbar-login-btn").click(renderLogin)

    $("#navbar-logout-btn").click(renderLogin)

    $("#login_form").submit(login)

    $("#join_start").click(show_join)

    $("#join_form").submit(join_submit)

    $("#home-faqs-btn").click(toggleFAQs)

    $("#home-events-btn").click(toggleCalendar)

});




//called when the user clicks the navbar login or logout buttons,
// brings the user to the login/sign up page
function renderLogin(event) {

    event.preventDefault();

    setLoggedInStatus(false);
    $("#login_form input[name=member_id]").empty();
    //if ($("#id-warning").attr("hidden", false))

};


function login(event) {

    event.preventDefault();

    //grab member id
    var member_id = $("#login_form input[name=member_id]").val();
    var id_warning = $("<span id='id-warning'></span>)").text("Member ID not valid.")

    //validate member id
    if (member_id != "12345"){
        // if not valid, show error message
        $("#login_section").append(id_warning);
         //id='id-warning' hidden='true' class='alert alert-danger'>Unable to locate member ID. Please try again!</span>")
        //$("#id-warning").attr("hidden", false);
    } else {
        // if valid, hide login section and show member home section
        $("#id-warning").remove();
        setLoggedInStatus(true);
    }

};

function show_join(event) {

    event.preventDefault();

    //display join form
    $("#join_form").attr("hidden", false);
    $("#join_start").remove();
};

function join_submit(event) {

    event.preventDefault();

    //clear any warning text from the last submit attempt
    $("td").remove(".text-danger");

    //form warnings
    var first_name_warning = $("<td id='first_name_warning' class='text-danger'></td>)").text("Please enter a valid first name.")
    var last_name_warning = $("<td id='last_name_warning' class='text-danger'></td>)").text("Please enter a valid last name.")
    var email_warning = $("<td id='email_warning' class='text-danger'></td>)").text("Please enter a valid email.")

    //grab info from join form
    var first_name = $("#join_form input[name=first_name]").val();
    var last_name = $("#join_form input[name=last_name]").val();
    var email = $("#join_form input[name=email]").val();

    //check form for valid inputs
    if (first_name == ""){
        $("#first-name-row").append(first_name_warning);
    } else {
        member_model.first_name = first_name;
    };

    if (last_name == ""){
        $("#last-name-row").append(last_name_warning);
    } else {
        member_model.last_name = last_name;
    };

    if (!emailIsValid(email)){
        $("#email-row").append(email_warning);
    } else {
        member_model.email = email;
        //form_checks_array.push(last_name);
        //console.log(member_model);
    };
    //console.log(member_model);

        /*
    } else if (last_name == ""){
        $("#last-name-row").append(last_name_warning);
    } else {
        setLoggedInStatus(true);
    }*/

};

function setLoggedInStatus(isLoggedIn){
    $("#member_home_section").attr("hidden", !isLoggedIn);
    $("#login_section").attr("hidden", isLoggedIn);
    $("#join_section").attr("hidden", isLoggedIn);
};

function toggleFAQs(event) {

    event.preventDefault();

    $("#faqs-container").toggle();
    $("#calendar-container").hide();
}

function toggleCalendar(event) {

    event.preventDefault();

    $("#calendar-container").toggle();
    $("#faqs-container").hide();

};

//------- FORM VALIDATION ------
function emailIsValid(email){

    // make an AJAX call to the Mailbox Layer API
    $.ajax({
        url: "http://apilayer.net/api/check?access_key=1ca6a150c9b1eef31a10d783d601f658&email=" + email + "&smtp=0",
        success: function(response) {
            console.log(response);

            var did_you_mean = response.did_you_mean;
            console.log(did_you_mean);

            if (did_you_mean != ""){
                var email_warning2 = $("<td id='email_warning2' class='text-danger'></td>)").text(did_you_mean);
                $("#email-row").append(email_warning2);
            } else {
                return;
            };

            if (response.format_valid == false || response.disposable == true){
                return false;
            } else {
                return true;
            };

        },
        error: function(err) {
            console.log(err);
        }
    });
};


    /*


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
