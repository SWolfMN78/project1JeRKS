//Initialize Firebase
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
$("#iSubmitBtn").on("click", function(event) {
    event.preventDefault();

    //pull the information from the host page to be used
    var hFullName = $("#full-name").val().trim();
    var hAddLine1 = $("#address-line1").val().trim();
    var hAddLine2 = $("#address-line2").val().trim();
    var hCity = $("#city").val().trim();
    var hRegion = $("#city").val().trim();
    var hzip = $().val().trim();
    // NOTE: Dropdown variables will be needed.

    //information to be pressed into the database.
    var newEntry = {
        name: hFullName,
        addy1: hAddLine1,
        addy2: hAddLine2,
        city: hCity,
        zip: hzip,
    };

    //push the information up to the database.
    database.ref().push(newEntry);

    //push the information to the console for verification.
    console.log(newEntry.name);
    console.log(newEntry.addy1);
    console.log(newEntry.addy2);
    console.log(newEntry.hCity);
    console.log(newEntry.city);
    console.log(newEntry.zip);

    //Clear the information from the screen

});