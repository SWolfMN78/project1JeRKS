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


function fillInMenuTable(user) {
    // right now, user data is not added to event data. For now, if event does not have user assigned, assume it is our user's event. But check for assigned user.

    database.ref("Events").once("value", function(snapshot) {
        var events = snapshot.val();
        console.log("events", events)
        for (var eventID in events) {
            var event = events[eventID];
            if (!event.hostUser || event.hostUser === user.uid) {
                console.log("event", event);
                // add data for each guest from this event
                if (!event.guestEmails || event.guestEmails.length < 1) {
                    var row = $("<tr>").html("<td>No guest data for event " + event.uid + "</td>")
                    $("#menu-table tbody").append(row)


                }
                else {
                    event.guestEmails.forEach(function(guest) {
                        // create row in table for each guest with what they're bringing.
                        // We haven't clearly defined a data setup for this yet.
                        var course = "sample course"   // get course
                        var dish = "sample dish"       // get dish
                        var guestName = ""
                        var displayName = guestName || guest
                        var row = $("<tr>").html("<td>" + course +" </td><td>" + dish +" </td><td>" + displayName +" </td>")
                        $("#menu-table tbody").append(row)

                    })
                }

            }
        }
    })

}

function getEventDataOfUser(user) {

}



// authentication functions
function authChangeCallback(user) {
    if (user) {
        console.log("detected change in auth user state. User is signed in.")
        // User is signed in.
        $("#user-login-logoff").text("Logoff")
        // if on the menu page (menu-table exists),  populate table for user's event firebasse listener
        if ($("#menu-table").length > 0) {
            console.log("trying to fill menu-table")
            var userID  = user.uid;
            fillInMenuTable(user)
        }

    }
    else {
        console.log("detected change in auth user state. User is signed out.")
        // No user is signed in.

        $("#user-login-logoff").text("Login");
        $("#modal-authenticate").iziModal("close");
    }
}


var createNewUser = function(displayName, email, password, successCallback, errorCallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayName
        }).then(function(user) {
            if (typeof successCallback !== "null" ) successCallback(user)
        });

    }).then(function(user) {
            if (typeof successCallback !== "null" ) successCallback(user)
    }).catch(function(error) {
        // Handle Errors here.
        console.log("had error with firebase.auth()", error)
        if (typeof errorCallback !== "null") errorCallback(error);
    });
}


var loginUser = function(email, password, successCallback, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
        // app.createFirebaseListeners();
        var user = firebase.auth().currentUser;
        if (typeof successCallback !== "null" ) successCallback(user)

    }).catch(function(error) {
        // Handle Errors here.
        console.log("had error with firebase.auth()", error)
        // if (typeof errorCallback !== "null") errorCallback(error);
        // errorCallback(error);
        // ...
    });
}

var loginCallback = function() {
    // $("#alert-modal .iziModal-header-title").text("User " + firebase.auth().currentUser.displayName + " is logged in.")
    $("#alert-modal").iziModal({"overlay": false});
    $("#alert-modal").iziModal('setBackground', "#19647E");
    $("#alert-modal").iziModal("open");
}

var registrationCallback = function() {
    $("#alert-modal .iziModal-header-title").text("New User Created!")
    $("#alert-modal").iziModal({"overlay": false});
    $("#alert-modal").iziModal('setBackground', "#19647E");
    $("#alert-modal").iziModal("open");
}

var logoutCallback = function() {
    // $("#alert-modal").iziModal('setBackground', "#bd5b5b");
    $("#alert-modal").iziModal({"overlay": false});
    $("#alert-modal .iziModal-header-title").text("User logged off")
    $("#alert-modal").iziModal('setBackground', "#bd5b5b");
    $("#alert-modal").iziModal("open");

}

$(document).ready(function() {

    var eventData = {}

    // initialize modals
    if ($("#guests-email-form").length > 0) {
        $("#guests-email-form").iziModal({headerColor: "#1a1a1a", "overlay": false, "overlayClose": false});
    }
    $("#alert-modal").iziModal({ top: null, bottom: 0, background: "#19647E"});
    $("#alert-modal").iziModal({ background: "#19647E"});
    $("#modal-authenticate").iziModal();
    // $("#modal-authenticate").iziModal('close');
    // $('#user-login-logoff').on("click", function(event) {
    //     event.preventDefault();
    //     console.log("detected click");
    //     $("#modal-authenticate").iziModal('open')
    // });
    // $("#alert-modal").iziModal('setBackground', "#19647E");


    /* Host Controls:
    set the control to add the information when clicked
    then display the info back for verification.
    */


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
            $("#alert-modal .iziModal-header-title").text("Invitiations sent successfully!")
            $("#alert-modal").iziModal('setBackground', "#19647E");
            $("#alert-modal").iziModal("open");

        }
        var errorCallback = function(error) {
            console.log("error sending emails")
            // $("#alert-modal p").text("Error while trying to send emails!")
            $("#alert-modal .iziModal-header-title").text("There was a problem sending your invitations.")
            $("#alert-modal").iziModal('setBackground', "#bd5b5b");
            $("#alert-modal").iziModal("open");
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







    // authentication listeners

    // fire when user-login, registration, or user-log off occurs
    firebase.auth().onAuthStateChanged(authChangeCallback);

    $("#register-user").on("click", function(event) {
        // Don't refresh the page!
        console.log("detected click");
        event.preventDefault();
        var displayName = $("#name-input").val().trim();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        var passwordConfirm = $("#password-confirm").val().trim();

        // check that displayname has characters, email address
        // note that the email regular expression is not really very thorough.
        if (displayName.match("[a-zA-Z]+") && email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+") && password === passwordConfirm) {
            createNewUser(displayName, email, password, registrationCallback);
            $("#name-input").val("");
            $("#email").val("");
            $("#password").val("");
            $("#password-confirm").val("");
        }
        else {
            console.log("Form data is invalid. Display message");
        }

    });

    $("#login-user").on("click", function(event) {
        // Don't refresh the page!
        console.log("detected click");
        event.preventDefault();
        // var displayName = $("#name-input").val().trim();
        var email = $("#email1").val().trim();
        var password = $("#passsword1").val().trim();

        // check that displayname has characters, email address
        // note that the email regular expression is not really very thorough.
        if (email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+") && password.length >= 6) {
            loginUser(email, password, loginCallback);
            $("#email1").val("");
            $("#passsword1").val("");
        }
        else {
            console.log("User login data is invalid. Display message");
        }

    });

    $("#user-login-logoff").on("click", function(event) {
        if (!firebase.auth().currentUser) {
            // no user is logged in. Show login/registration modal
            $("#modal-authenticate").iziModal("open");

        }
        else {
            // there is a user logged in. Log them off.
            firebase.auth().signOut().then(function() {
                // app.removeFirebaseListeners()
                // Sign-out successful.
            logoutCallback();
            $("#modal-authenticate").iziModal("close")

            // $("#alert-modal").iziModal("open");
                console.log("Sign-out successful")

            }).catch(function(error) {
                console.log(error)
                // An error happened.
            });

        }
    });




})
