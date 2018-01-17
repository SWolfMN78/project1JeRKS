/***** Changes in authorization state
	Here is a sample of a callback that can be passed to the listener right below it.
	On any change of the state of the authorized user (sign in, sign out, or even just a page refresh), the callback function will run.
*/


let sampleCallbackForAuthStateChange = function(user) {
	if (user) {
		console.log("detected change in auth user state. User is signed in.")
	}
	else {
		console.log("detected change in auth user state. User is signed out.")
	}

}

// Listen for changes in authorized user state
firebase.auth().onAuthStateChanged(sampleCallbackForAuthStateChange);





/**** Create new user
	Call this function below with the arguments diplayname, email, password, (optional) successCallback, (optional) errorCallback
	For Firebase authentication, using basic email/password authentication, it requires specifically a valid email address and a somewhat strong password


*/

let createNewUser = function(displayName, email, password, successCallback, errorCallback) {
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(data) {
		// app.createFirebaseListeners();
		let user = firebase.auth().currentUser;

		user.updateProfile({
			displayName: displayName
		}).then(function() {
			successCallback(user)
		});

	}).catch(function(error) {
		// Handle Errors here.
		console.log("had error with firebase.auth()", error)
		errorCallback(error);
		// ...
	});
}


/* not done yet*/
let loginUser = function(email, password, successCallback, errorCallback) {
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
		// app.createFirebaseListeners();
		let user = firebase.auth().currentUser;
		successCallback(user)

	}).catch(function(error) {
		// Handle Errors here.
		console.log("had error with firebase.auth()", error)
		errorCallback(error);
		// ...
	});
}



/*** Sample listener for a New User form.  */
let sampleCallback = function(newUser) {
	console.log("newUser: ", newUser)
}

$("#add-user").on("click", function() {
	// Don't refresh the page!
	console.log("detected click");
	event.preventDefault();
	let displayName = $("#name-input").val().trim();
	let email = $("#email-input").val().trim();
	let password = $("#password-input").val().trim();
	let passwordConfirm = $("#password-confirm").val().trim();

	// check that displayname has characters, email address
	// note that the email regular expression is not really very thorough.
	if (displayName.match("[a-zA-Z]+") && email.match("[a-zA-Z]+.*@.*[a-zA-Z]+.*[.][a-zA-Z]+") && password === passwordConfirm) {
		createNewUser(displayName, email, password, sampleCallback);
	}
	else {
		console.log("Form data is invalid. Display message");
	}

});