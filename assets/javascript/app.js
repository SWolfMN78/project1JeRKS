//Initialize Firebase - group databse.
var config = {
    apiKey: "AIzaSyDzdxqnOhqs4axrlP42yaKilGnI4wNq_Zs",
    authDomain: "mytempdba.firebaseapp.com",
    databaseURL: "https://mytempdba.firebaseio.com",
    projectId: "mytempdba",
    storageBucket: "mytempdba.appspot.com",
    messagingSenderId: "626306864070"
};
firebase.initializeApp(config);

// global control variables
var database = firebase.database();

/* Host Controls:
set the control to add the information when clicked
then display the info back for verification.
*/

$(document).ready(function() {

    var eventData = {}

    // initialize modals
    $("#guests-email-form").iziModal({headerColor: "#1a1a1a"});
    $("#guests-email-result").iziModal({ top: null, bottom: 0, background: "#19647E"});
    // $("#guests-email-result").iziModal('setBackground', "#19647E");


    $("#iSubmitBtn").on("click", function(event) {
        event.preventDefault();

        //pull the information from the host page to be used
        var hFullName = $("#full-name").val().trim();
        var hAddLine1 = $("#address-line1").val().trim();
        var hAddLine2 = $("#address-line2").val().trim();
        var hCity = $("#city").val().trim();
        var hRegion = $("#region").val().trim();
        var hzip = $("#postal-code").val().trim();
        // NOTE: Dropdown variables will be needed.

        //information to be pressed into the database.
        var newEntry = {
            name: hFullName,
            addy1: hAddLine1,
            addy2: hAddLine2,
            city: hCity,
            region: hRegion,
            zip: hzip
        };

        //push the information up to the database.
        var eventSnapshot = database.ref("Events").push(newEntry);

        eventData = Object.assign({}, newEntry);
        eventData.eventID = eventSnapshot.key;

        //push the information to the console for verification.
        // console.log(newEntry.name);
        // console.log(newEntry.addy1);
        // console.log(newEntry.addy2);
        // console.log(newEntry.hCity);
        // console.log(newEntry.city);
        // console.log(newEntry.zip);

        //Clear the information from the screen
        // alert("Added!");

        //clear the info
        $("#full-name").val("");
        $("#address-line1").val("");
        $("#address-line2").val("");
        $("#city").val("");
        $("#region").val("");
        $("#postal-code").val("");


        // $("#initial-form").hide()
        // $("#guests-email-form").show();
        $('#guests-email-form').iziModal('open');

    });



    $("#add-guest").on('click', function(event) {
        event.preventDefault();
        var email = $("#new-guest-email").val().trim()
        if (email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+")) {
            $("#added-guests ul").append($("<li>").text(email).val(email))
            $("#new-guest-email").val("");

        }

        else {
            // should display an error. However, right now, just console.log
            console.log("email address does not appear to be valid.")
        }
    })

    $("#iSubmitGuests").on("click", function(event) {
        event.preventDefault();
        //get all email adddresses submitted.
        var emails = [];
        $("#added-guests ul li").each(function(index) {
            // get email address from each list item and append to emails array (push onto array)
            var email = $(this).text();
            emails.push(email)
        })
        eventData.guestEmails = emails;
        console.log(eventData);
        console.log(eventData.eventID)
        database.ref("Events").child(eventData.eventID).update({
            guestEmails: eventData.guestEmails
        });

        var emailInfo = {
            sender: "seml0021@umn.edu",
            to: emails,
            messageType: "invite"

        }
        var successCallback = function(data) {
            console.log("success sending emails!");
            $("#guests-email-result .iziModal-header-title").text("Invitiations sent successfully!")
            $("#guests-email-result").iziModal('setBackground', "#19647E");
            $("#guests-email-result").iziModal("open");

        }
        var errorCallback = function(error) {
            console.log("error sending emails")
            $("#guests-email-result .iziModal-header-title").text("There was a problem sending your invitations.")
            $("#guests-email-result").iziModal('setBackground', "#bd5b5b");
            $("#guests-email-result").iziModal("open");
            // trigger-alert

        }
        try {
            var email = new Email(emailInfo);
            email.send(successCallback, errorCallback)
        }
        catch(error) {
            errorCallback(error);
        }
    })


})
