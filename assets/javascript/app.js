//Makes landing page clickable
$(".landing-page").click(function() {
    window.location = $(this).find("a").attr("href");
    return false;
});

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

//Global Control Variables
var database = firebase.database();

//if this returns false then throw an error and don't allow info input
// var validChkr = true;
// $("#menu-table tbody course-item").

function getEventIDFromURL() {
    var eventID;
    var regEx = /.*guestConfig\.html\?eventID=([a-zA-Z0-9\-]{5,})/
    if (document.URL.match(regEx)) {
        eventID = document.URL.replace(regEx, "$1");
    }
    return eventID;
}

// ****** Helper functions for menu page
function appendDishToMenu(dish) {
    for (var key in dish) {
        console.log("key", key, ", item ", dish[key])
    }
    var rowhtml = [dish.course, dish.dish, dish.attendee].map(val => "<td>" + val + "</td>").join("");
    $("#menu-table tbody").append($("<tr>").append(rowhtml));
}

//Fill in Menu
function fillInMenuTable(user, eventID) {
    // right now, we are just gettting all the events, and for each event, if it belongs to the user, or, the it is an event where the user guest, display data.
    // if there  is an eventID stored in localStorage, show eventData for that event
    console.log("user", user, "eventID", eventID)
    if (eventID) {
        database.ref("Events").child(localStorage.eventID + "/dishes").on("child_added", function(dishSnapshot) {

            appendDishToMenu(dishSnapshot.val());
        })
    }
    // if a user is signed in, show the events that the user is a host for or a guest at.
    else if (user) {
        console.log("hey0")
        database.ref("Events").on("value", function(snapshot) {
            var events = snapshot.val();
            for (var eventID in events) {
                var event = events[eventID];
                if (event.userID === user.uid || (event.guestEmails && Array.isArray(event.guestEmails) && event.guestEmails.indexOf(user.email) > -1)) {
                    for (var key in event.dishes) {
                        appendDishToMenu(event.dishes[key]);
                    }
                }
            }

        })
    }
}

//Authentication helper Functions
function authChangeCallback(user) {
    if (user) {
        console.log("detected change in auth user state. User is signed in.")
            // User is signed in.
        $("#user-login-logoff").text("Logoff " + firebase.auth().currentUser.displayName)
        if (localStorage.eventID) localStorage.removeItem("eventID");
        if (localStorage.guestEmail) localStorage.removeItem("guestEmail");
        // if on the menu page (menu-table exists),  populate table for user's event firebasse listener
        if ($("#menu-table").length > 0) {
            console.log("trying to fill menu-table")
            fillInMenuTable(user)
        }

    } else {
        console.log("detected change in auth user state. User is signed out.")
            // No user is signed in.
        $("#user-login-logoff").text("Login");
        if (("#modal-authenticate").length) {
            $("#modal-authenticate").iziModal("close");
        }
        // try to fill menu in data with guest email address
        // var userEmail = localStorage.guestEmail;
        if (localStorage.eventID) {
            var user = {
                uid: undefined,
                email: localStorage.guestEmail
            }
            console.log(user, localStorage.eventID)
            fillInMenuTable(user, localStorage.eventID)
        }
    }
}

//Create a New User
var createNewUser = function(displayName, email, password, successCallback, errorCallback) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: displayName
        }).then(function(user) {
            if (typeof successCallback !== "null") successCallback(user)
        });

    }).then(function(user) {
        if (typeof successCallback !== "null") successCallback(user)
    }).catch(function(error) {
        // Handle Errors here.
        console.log("had error with firebase.auth()", error)
        if (typeof errorCallback !== "null") errorCallback(error);
    });
}

//User Login
var loginUser = function(email, password, successCallback, errorCallback) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
        // app.createFirebaseListeners();
        var user = firebase.auth().currentUser;
        if (typeof successCallback !== "null") successCallback(user)

    }).catch(function(error) {
        // Handle Errors here.
        console.log("had error with firebase.auth()", error)
            // if (typeof errorCallback !== "null") errorCallback(error);
            // errorCallback(error);
    });
}

//Login Modals
var loginCallback = function() {
    // $("#alert-modal .iziModal-header-title").text("User " + firebase.auth().currentUser.displayName + " is logged in.")
    $("#alert-modal").iziModal({ "overlay": false });
    $("#alert-modal").iziModal('setBackground', "#19647E");
    $("#alert-modal").iziModal("open");
}

var registrationCallback = function() {
    $("#alert-modal .iziModal-header-title").text("New User Created!")
    $("#alert-modal").iziModal({ "overlay": false });
    $("#alert-modal").iziModal('setBackground', "#19647E");
    $("#alert-modal").iziModal("open");
}

var logoutCallback = function() {
    // $("#alert-modal").iziModal('setBackground', "#bd5b5b");
    $("#alert-modal").iziModal({ "overlay": false });
    $("#alert-modal .iziModal-header-title").text("User logged off")
    $("#alert-modal").iziModal('setBackground', "#bd5b5b");
    $("#alert-modal").iziModal("open");
}

/* Attempted validator for insuring user fields are filled. */
// function isValid(validChkr) {
//     //controls to insure that information is entered and not blank strings
//     var hFullName = $("#full-name").val().trim();
//     var hAddLine1 = $("#address-line1").val().trim();
//     var hAddLine2 = $("#address-line2").val().trim();
//     var hCity = $("#city").val().trim();
//     var hRegion = $("#region").val().trim();
//     var hzip = $("#postal-code").val().trim();
//     var hTheme = $("#inputGroupSelect01 option:selected").val().trim();
//     var hCourse = $("#inputGroupSelect03 option:selected").val().trim();
//     var hCourseAmounts = $("#inputGroupSelect03 option:selected").val().trim();
//     var hEventAttire = $("#inputGroupSelect02 option:selected").val().trim();

//     //return an element of false
//     if (hFullName === "" || hAddLine1 === "" || hAddLine2 === "" ||
//         hCity === "" || hRegion === "" || hzip === "") {
//         alert("Bad bad");
//         return false;
//     };

//     if (hTheme === 0 || hCourse === 0 ||
//         hCourseAmounts === 0 || hEventAttire === 0) {
//         alert("bad bad");
//         return false;
//     };
// }

$(document).ready(function() {

    // if the page was loaded by a guest user with an eventID appended to the URL, we should get this.
    var eventID = getEventIDFromURL();
    if (!firebase.auth().currentUser && typeof eventID === "string") {
        localStorage.eventID = eventID;
    }

    //Initialize Modals
    if ($("#guests-email-form").length > 0) {
        $("#guests-email-form").iziModal({ headerColor: "#1a1a1a", "overlay": false, "overlayClose": false });
    }
    if ($("#alert-modal").length > 0) {
        $("#alert-modal").iziModal({ top: null, bottom: 0, background: "#19647E" });
        $("#alert-modal").iziModal({ background: "#19647E" });

    }
    if ($("#modal-authenticate").length > 0) {
        $("#modal-authenticate").iziModal();
    }
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

    var eventData = {}

    $("#invite-guest-button").on("click", function(event) {
        event.preventDefault();

        /* Trying to get a validator to insure that the user fields are filled. */
        // isValid();
        // if (isValid === false) {
        //     //if isValid comes back as false then stop what is happening and wait for correct info.
        //     return;
        // }

        //pull the information from the host page to be used
        var hFullName = $("#full-name").val().trim();
        var hAddLine1 = $("#address-line1").val().trim();
        var hAddLine2 = $("#address-line2").val().trim();
        var hCity = $("#city").val().trim();
        var hRegion = $("#region").val().trim();
        var hzip = $("#postal-code").val().trim();
        var hTheme = $("#inputGroupSelect01").val().trim();
        var hEventAttire = $("#inputGroupSelect02").val().trim();
        var hCourse = [];
        $("#inputGroupSelect03 option:selected").each(function() {
            hCourse.push($(this).text());
        });
        var hEventTime = $("#time").val().trim();
        var hEventDate = $("#date").val().trim();

        //variable to build link between host and guest page
        var eventItemInfo = hFullName + ", " + hEventDate + ", " + hEventTime;

        //Updates host name on guest page
        // $("#guest-invite-header").text("You've been invited to a party at " + hFullName + "'s house.");
        // $("#choose-course-header").text("Pick a course to share at " + hFullName + "'s party.");

        //information to be pressed into the database.
        var newEntry = {
            name: hFullName,
            addy1: hAddLine1,
            addy2: hAddLine2,
            city: hCity,
            region: hRegion,
            zip: hzip,
            theme: hTheme,
            eventAttire: hEventAttire,
            course: hCourse,
            time: hEventTime,
            date: hEventDate,
            eventInfo: eventItemInfo,
        };

        // if user is logged in, add user id, user name
        var currentUser = firebase.auth().currentUser;
        if (currentUser) {
            newEntry.userName = currentUser.displayName;
            newEntry.userID = currentUser.uid;
        }


        // console.log("newEntry", newEntry);
        //push the information up to the database.
        var eventSnapshot = database.ref("Events").push(newEntry);

        eventData = Object.assign({}, newEntry);
        eventData.eventID = eventSnapshot.key;

        //Clear the Information
        $("#full-name").val("");
        $("#address-line1").val("");
        $("#address-line2").val("");
        $("#city").val("");
        $("#region").val("");
        $("#postal-code").val("");
        $("#date").val("");
        $("#time").val("");
        //this needs to be checked into to be fixed.
        $("#inputGroupSelect01 option:selected").prop("selected", false);
        $("#inputGroupSelect02 option:selected").prop("selected", false);
        $("#inputGroupSelect03 option:selected").prop("selected", false);

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

        } else {
            // should display an error. However, right now, just console.log
            console.log("email address does not appear to be valid.")
        }
    })

    $("#submit-email-button").on("click", function(event) {
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
        var senderInfo = "semlak0021@umn.edu"

        var emailInfo = Object.assign({}, eventData);
        emailInfo.sender = senderInfo;
        emailInfo.messageType = "invite";
        emailInfo.link = (document.URL.replace(/[a-zA-Z]{1,}\.html.*/, "") + "guestConfig.html?eventID=" + eventData.eventID)
        emailInfo.to = emails;

        console.log("emailInfo: ", emailInfo)

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
        } catch (error) {
            console.log("error")
            console.log(error)
            errorCallback(error);
        }
    })

    // authentication listeners

    // fire when user-login, registration, or user-log off occurs
    firebase.auth().onAuthStateChanged(authChangeCallback);

    //Register Users
    $("#register-user-button").on("click", function(event) {
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
        } else {
            console.log("Form data is invalid. Display message");
        }

    });

    $("#login-user-button").on("click", function(event) {
        // Don't refresh the page!
        console.log("detected click");
        event.preventDefault();
        // var displayName = $("#name-input").val().trim();
        var email = $("#email1").val().trim();
        var password = $("#password1").val().trim();

        // check that displayname has characters, email address
        // note that the email regular expression is not really very thorough.
        if (email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+") && password.length >= 6) {
            loginUser(email, password, loginCallback);
            $("#email1").val("");
            $("#passsword1").val("");
        } else {
            console.log("User login data is invalid. Display message");
        }
    });

    $("#user-login-logoff").on("click", function(event) {
        if (!firebase.auth().currentUser) {
            // no user is logged in. Show login/registration modal
            if ($("#modal-authenticate").length > 0) {
                $("#modal-authenticate").iziModal("open");
            }

        } else {
            // there is a user logged in. Log them off.
            firebase.auth().signOut().then(function() {
                // app.removeFirebaseListeners()
                // Sign-out successful.
                logoutCallback();
                if ($("#modal-authenticate").length > 0) {
                    $("#modal-authenticate").iziModal("close")
                }

                // $("#alert-modal").iziModal("open");
                console.log("Sign-out successful")

            }).catch(function(error) {
                console.log(error)
                    // An error happened.
            });
        }
    });

    /* The below block was the original attempt but the key for the different
    events could not be found. */
    //get the information from the DBA and apply it to the different fields for use.
    // database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //     debugger
    //     //push the information into variables.
    //     var atdCourse = childSnapshot.val();
    //     var atdGuestEml = childSnapshot.val().guestEmails;
    //     var atdHostName = childSnapshot.val().name;
    //     var atdEventTime = childSnapshot.val().time;
    //     var atdEventDate = childSnapshot.val().date;
    //     var atdDishInfo = childSnapshot.val()

    //     //push the information into the guest drop down list.
    //     $(".cHostInfomation > select").append("<option>" + atdHostName + "</option>");

    //     //push the information into the table.

    // });

    // check to see if we are on guestConfig.html  (basically, that page has #eventSelector and #emailAttendeeSelector)
    if ($("#eventSelector").length > 0 && $("#emailAttendeeSelector").length > 0) {
        var dataRef = firebase.database().ref('Events');
        dataRef.on('child_added', function(childSnapshot) {
            //alert(data.val().name);

            var atdHostName = childSnapshot.val().name;
            var atdEventDate = childSnapshot.val().date;
            var atdEventTime = childSnapshot.val().time;
            var atdGuestEml = childSnapshot.val().guestEmails;
            var atKey = childSnapshot.key;
            var selectEvent = (localStorage.eventID === atKey)
            console.log("select event ", atKey, selectEvent)
            $(".cHostInfomation > select").append("<option key='" + atKey + "'" + (selectEvent ? "selected" : "") + ">" + atdHostName + ", " + atdEventDate + " @ " + atdEventTime + "</option>");
            //$(".cHostInfomation > select").append("<option key='" + atKey + "'>" + atKey + "</option>");
            if (selectEvent) {
                $("#eventSelector").trigger("change");
                $("#guest-invite-header").text("You've been invited to a party at " + atdHostName + "'s house.");
                $("#choose-course-header").text("Pick a course to share at " + atdHostName + "'s party.");
            }
        });
    }

    $("#eventSelector").on("change", function() {
        $("#emailAttendeeSelector").removeAttr("disabled");
        $(".cAttendeeInfo > select").empty();
        $("#emailAttendeeSelector").append("<option>" + "Choose..." + "</option>");
        $("#courseSelection01").empty();
        $("#courseSelection01").append("<option>" + "Choose..." + "</option>");
        var key = $("option:selected", this).attr("key");

        if (key !== eventID) {
            eventID = key;
            localStorage.eventID = key;
            var regEx = /(.*guestConfig\.html)\?eventID=[a-zA-Z0-9\-]{5,}/
            if (document.URL.match(regEx)) {
                // window.history.pushState(null, "Guest Response", document.URL.replace(regEx, "$1"));

            }
        }

        var dataRef = firebase.database().ref('Events');
        dataRef.child(key).on('value', function(childSnapshot) {
            var atdGuestEml = childSnapshot.val().guestEmails;
            var atKey = childSnapshot.key;
            var sltCourse = childSnapshot.val().course;
            $(atdGuestEml).each(function(index, data) {
                $(".cAttendeeInfo > select").append("<option>" + data + "</option>");
            })
            $(sltCourse).each(function(index, data) {
                $("#courseSelection01").append("<option>" + data + "</option>");
            })
        });
    });

    //fill the list drop downs according to the information which is selected in the course dropdown.
    dishOptions = {
        "Appetizer": ["Potato Skins", "Hummus", "Cut Vegetables", "Crackers"],
        "Main Course": ["Sloppy Joes", "Lasagna", "Pizza"],
        "Salad": ["Ceasar Salad", "A Big Salad", "Potato Salad"],
        "Breads": ["Sour Dough", "Whole Wheat", "Pumpernickel"],
        "Soup": ["Tomoto Basil", "Mulligatawny"],
        "Beverages": ["Soda", "Sparkling Water"],
        "Cocktails": ["Vodka Tonic"],
        "Dessert": ["Key  Lime Pie", "Brownies"],
        "Apertifs": ["Dubonnet"]
    }

    //adjsut the drop downs ba
    $("#courseSelection01").on("change", function() {
        $("#dishSelection01").empty();
        $("#dishSelection01").append("<option>" + "Choose..." + "</option>");

        // the dish selection menu will populate programatically using the above 'dishOptions' object, which we could modify with data from firebase/elsewhere
        if (dishOptions[$("#courseSelection01").val()]) {
            dishOptions[$("#courseSelection01").val()].forEach(function(dish) {
                $("#dishSelection01").append("<option>" + dish + "</option>");
            })
        }
    });

    $("#guest-response-accept").on("click", function(event) {
        event.preventDefault();
        var eventID = $("#eventSelector option:selected").attr("key");
        var guestEmail = $("#emailAttendeeSelector").val()
        var course = $("#courseSelection01").val()
        var dish = $("#dishSelection01").val()
        if ([eventID, course, guestEmail, dish].every(attr => typeof attr === "string")) {
            // var eventRef = database.ref("Events").child(key + "/dishes")
            database.ref("Events").child(eventID + "/dishes").push({
                "attendee": guestEmail,
                "course": course,
                "dish": dish
            })
        }
        console.log(eventID, guestEmail, dish)
    })

    $("#emailAttendeeSelector").on("change", function(event) {
        var guestEmail = $("#emailAttendeeSelector").val();
        if (guestEmail) {
            localStorage.guestEmail = guestEmail.trim();
        }
    })
});