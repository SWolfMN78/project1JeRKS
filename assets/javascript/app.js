//temp Initialize database until Joe's is ready to launch.
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
});