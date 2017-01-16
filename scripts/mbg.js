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

    // ----- SIGN UP: validate user data


    // ---- CALENDAR, grab calendar info from fullCalendar and our event objects:
    $("#calendar").fullCalendar({
        // put your options and callbacks here (from fullCalendar)
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

    $("#navbar-logout-btn").hide();

    $("#navbar-login-btn").click(renderLogin)

    $("#navbar-logout-btn").click(renderLogin)

    $("#login_form").submit(login)

    $("#join_form").submit(join_submit)

    $("#home-faqs-btn").click(toggleFAQs)

    $("#home-events-btn").click(toggleCalendar)

});




//called when the user clicks the navbar login button,
// brings the user to the login/join page
function renderLogin(event) {

    event.preventDefault();

    // clear any info stored in the member_model
    clearMemberModel();
    //clear any previous login attempts in login form
    $("#member-id-attempt").val("");
    // clear any previous warnings on login form
    $("#id-warning").remove();

    //hide member_home_section and show login and join forms
    $("#member_home_section").hide();
    $("#login_section").show();
    $("#join_section").show();

    // show login button, hide logout button
    $("#navbar-login-btn").show();
    $("#navbar-logout-btn").hide();

};


function login(event) {

    event.preventDefault();

    var id_warning = $("<span id='id-warning' class='alert alert-danger'></span>)").text("Member ID not valid.")

    //if a warning has already been created, clear it
    $("#id-warning").remove();

    //validate member-id-attempt
    if ($("#member-id-attempt").val() != "12345"){
        // if not valid, show error message
        $("#login_section").append(id_warning);
    } else {
        // if valid, login
        // when logged in, show member home section, hide login and join forms
        $("#member_home_section").show();
        $("#login_section").hide();
        $("#join_section").hide();

        // show logout button, hide login button
        $("#navbar-logout-btn").show();
        $("#navbar-login-btn").hide();

        // for now, populate member_model w/ info
        member_model.first_name = "Carly";
        member_model.last_name = "Langlois";
        member_model.email = "cj.langlois.cl@gmail.com";

    }


};


function join_submit(event) {

    event.preventDefault();

    //clear any warning text from the last submit attempt
    $("first_name_warning").remove();
    $("#last_name_warning").remove();
    $("#email_warning").remove();
    $("#email_warning2").remove();

    //form warnings
    var first_name_warning = $("<td id='first_name_warning' class='alert alert-danger'></td>)").text("Please enter a valid first name.")
    var last_name_warning = $("<td id='last_name_warning' class='alert alert-danger'></td>)").text("Please enter a valid last name.")

    //grab info from join form
    var first_name_attempt = $("#join_form input[name=first_name]").val();
    var last_name_attempt = $("#join_form input[name=last_name]").val();
    var email_attempt = $("#join_form input[name=email]").val();

    //check for value in first name field, if valid, save value into member_model
    if (first_name_attempt == ""){
        $("#first-name-row").append(first_name_warning);
    } else {
        member_model.first_name = first_name_attempt;
    };

    //check for value in last name field, if valid, save value into member_model
    if (last_name_attempt == ""){
        $("#last-name-row").append(last_name_warning);
    } else {
        member_model.last_name = last_name_attempt;
    };

    //check for value in email field, if valid, save value into member_model
    checkIfEmailIsValid(email_attempt);

    //check if all member_model field contain values, if so, setLoggedInStatus to true
    if (memberIsValid() == true){
        setLoggedInStatus(true);
    }

    //clear input fields for next round?
    $("#join_form input[name=first_name]").empty();
    $("#join_form input[name=last_name]").empty();
    $("#join_form input[name=email]").empty();

};


function setLoggedInStatus(isLoggedIn){
    // when logged in, show member home section, hide login and join forms
    $("#member_home_section").show();
    $("#login_section").hide();
    $("#join_section").hide();

    // show logout button, hide login button
    $("#navbar-logout-btn").show();
    $("#navbar-login-btn").hide();

};

function clearMemberModel(){
    //clear member_model values
    member_model.first_name = "";
    member_model.last_name = "";
    member_model.email = "";
    member_model.level = "";

}

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
function checkIfEmailIsValid(email){

    // make an AJAX call to the Mailbox Layer API
    $.ajax({
        url: "http://apilayer.net/api/check?access_key=1ca6a150c9b1eef31a10d783d601f658&email=" + email + "&smtp=0",
        success: function(response) {
            console.log(response);

            if (email == ""){
                var emailIsValid = false;
            } else if (response.format_valid == false){
                emailIsValid = false;
            } else if (response.disposable == true){
                emailIsValid = false;
            } else if (response.did_you_mean != ""){
                var email_warning2 = $("<td id='email_warning2' class='alert alert-danger'></td>)").text("Did you mean " + response.did_you_mean + "?");
                $("#email-row").append(email_warning2);
                emailIsValid = false;
            } else {
                emailIsValid = true;
            }

            if (emailIsValid){
                member_model.email = email_attempt;
            } else {
                var email_warning = $("<td id='email_warning' class='text-danger'></td>)").text("Please enter a valid email.")
                $("#email-row").append(email_warning);
            }

        },
        error: function(err) {
            console.log(err);
        }
    });
};

function memberIsValid(){
    if (member_model.first_name == ""){
        return false;
    } else if (member_model.last_name == ""){
        return false;
    } else if (member_model.email = ""){
        return false;
    } else {
        return true;
    }
};
