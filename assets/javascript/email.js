"use strict;"

// let SENDGRID_API_KEY = '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'
// let url = "https://api.sendgrid.com/v3/mail/send"
// let req = {
//     "api_key": "api-8A95BDFCFCC611E78C76F23C91C88F4E",
//     "to": ["Test Person <test@example.com>"],
//     "sender": "Test Persons Friend <test2@example.com>",
//     "subject": "Hello Test Person",
//     "text_body": "You're my favorite test person ever",
//     "html_body": "<h1>You're my favorite test person ever</h1>",
//     "custom_headers": [
//       {
//         "header": "Reply-To",
//         "value": "Actual Person <test3@example.com>"
//       }
//     ]
// }

//const messageBodyForInvite = "<!DOCTYPE html><html style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;-ms-overflow-style:scrollbar;-webkit-tap-highlight-color:transparent;\"><head style=\"box-sizing:border-box;-webkit-box-sizing:border-box;display:table-header-group;\"><meta charset=\"utf-8\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;\"><title style=\"box-sizing:border-box;-webkit-box-sizing:border-box;\"> MyShinDig</title><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;\"></head><body style='box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;line-height:1;background-color:#fff;letter-spacing:1px;font-family:\"Nunito Sans\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";font-weight:200;color:#919aa1;text-align:left;'><div class=\"container page-header\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;max-width:1140px;\"><div class=\"jumbotron\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:4rem 2rem;border:0;font-size:100%;font:inherit;vertical-align:baseline;margin-bottom:2rem;background-color:#f7f7f9;border-radius:0;\"><div class=\"container-fluid\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;\"><div class=\"row\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;\"><div class=\"col-md-8\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;-webkit-box-flex:0;-ms-flex:0 0 66.6666666667%;flex:0 0 66.6666666667%;max-width:66.6666666667%;\"> <a href=\"https://swolfmn78.github.io/project1JeRKS/index.html\" id=\"logo\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:35px!important;font:inherit;vertical-align:baseline;color:#1a1a1a;text-decoration:none;background-color:#558B6E;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;\"> MyShinDig </a></div><div class=\"col-md-4\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;-webkit-box-flex:0;-ms-flex:0 0 33.3333333333%;flex:0 0 33.3333333333%;max-width:33.3333333333%;\"> <nav style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;display:block;-ms-flex-wrap:wrap;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none;\"><a href=\"https://swolfmn78.github.io/project1JeRKS/hostConfig.html\" id=\"hostConfigLink\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:35px!important;font:inherit;vertical-align:baseline;color:#1a1a1a;text-decoration:none;background-color:#19647E;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;\"> Host </a> <a href=\"https://swolfmn78.github.io/project1JeRKS/guestConfig.html\" id=\"guestConfigLink\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:35px!important;font:inherit;vertical-align:baseline;color:#1a1a1a;text-decoration:none;background-color:#F49E4C;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;\"> Guest </a> <a href=\"https://swolfmn78.github.io/project1JeRKS/menu.html\" id=\"menuLink\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:35px!important;font:inherit;vertical-align:baseline;color:#1a1a1a;text-decoration:none;background-color:#AB3428;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;\"> Menu </a> <a href=\"host\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;color:#1a1a1a;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;\"> </a> </nav></div></div></div></div></div><div id=\"carouselExampleSlidesOnly\" class=\"carousel slide\" data-ride=\"carousel\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;\"><div class=\"carousel-inner\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;width:100%;overflow:hidden;\"><div class=\"carousel-item active\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;display:block;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;-webkit-transition:-webkit-transform 0.6s ease;transition:transform 0.6s ease, -webkit-transform 0.6s ease;-webkit-backface-visibility:hidden;backface-visibility:hidden;-webkit-perspective:1000px;perspective:1000px;\"> <img class=\"d-block w-100\" src=\"https://swolfmn78.github.io/project1JeRKS/assets/images/tuscanPicnic-760x242.jpg\" alt=\"First slide\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;page-break-inside:avoid;border-style:none;display:block !important;width:100% !important;\"></div></div></div><div class=\"container\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;max-width:1140px;\"><div class=\"row\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;\"><div class=\"col-sm-12\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%;\"><h3 style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:1.5rem!important;font:inherit;vertical-align:baseline;margin-top:0;margin-bottom:0.5rem;font-family:inherit;font-weight:600;line-height:1.2;color:#1a1a1a;orphans:3;widows:3;page-break-after:avoid;text-transform:uppercase;letter-spacing:3px;\"> You've been invited to a party at + \"#hostName\" + 's house.</h3></div></div></div><div class=\"container\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto;max-width:1140px;\"><div class=\"row text-center\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px;text-align:center !important;\"><div class=\"col-sm\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;position:relative;width:100%;min-height:1px;padding-right:15px;padding-left:15px;-ms-flex-preferred-size:0;flex-basis:0;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;max-width:100%;\"> <a class=\"btn btn-primary\" href=\"https://swolfmn78.github.io/project1JeRKS/guestConfig.html\" target=\"_blank\" role=\"button\" style=\"box-sizing:border-box;-webkit-box-sizing:border-box;margin:0;padding:0.75rem 2rem;border:1px solid transparent;font-size:0.765625rem;font:inherit;vertical-align:middle;color:#fff;text-decoration:none;background-color:#1a1a1a;-webkit-text-decoration-skip:objects;-ms-touch-action:manipulation;touch-action:manipulation;display:inline-block;font-weight:600;text-align:center;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:1.5;border-radius:0;-webkit-transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;text-transform:uppercase;border-color:#1a1a1a;\"> Respond to Invite </a></div></div></div></body></html>"
const messageBodyForInviteTemplate = "%%HOSTNAME%% has invited you to an event! The event is on %%DATE%% at %%TIME%% at %%LOCATION%%. You can respond to the invite at %%LINK%%."
const messageBodyForCancelTemplate = "<h1>Event Canceled</h1><p>Blah Blah</p>"
const messageBodyForUpdateTemplate = "<h1>Event Update</h1><p>Blah Blah</p>"
// could have other sample message bodies.


// we can add to these
let messageTemplates = {
	"invite": {
		messageSubject: "%%HOSTNAME%% has invited you to an event via MyShindig!",
		// messageBodyHTML: null,
		messageBodyText: messageBodyForInviteTemplate
	},
	"cancel": {
		messageSubject: "Your MyShindig event canceled",
		messageBodyHTML: messageBodyForCancelTemplate,
		messageBodyText: "Canceled event. add to this later"
	},
	"update": {
		messageSubject: "Update to MyShindig event",
		messageBodyHTML: messageBodyForUpdateTemplate,
		messageBodyText: "Updated event. add to this later"
	}
}

// we could add to this

// var = 7  / 0;
console.log("loading Email class");

let Email = class {
	constructor(data) {
		console.log("creating email Object instance")
		console.log(data);
		// will probably obtain this from database. Right now use this
		let api_key = "api-8A95BDFCFCC611E78C76F23C91C88F4E";
		this.url = "https://api.smtp2go.com/v3/email/send";

		if (!data.sender) throw "Email needs sender address."
		if (!data.to || data.to.length < 1) throw "Email needs at least one recipient address.";
		if (!data.messageType || !messageTemplates[data.messageType]) {
			throw "Email needs message type ('invite', 'cancel', 'update', etc...)."
		}

		var messageInfo = messageTemplates[data.messageType];
		for (var key in messageInfo) {
			messageInfo[key] = messageInfo[key]
			.replace(/%%HOSTNAME%%/, data.name)
			.replace(/%%DATE%%/, data.date)
			.replace(/%%TIME%%/, data.time)
			.replace(/%%LOCATION%%/, [data.addy1, data.addy2, data.city, data.region, data.city, data.region].filter(attr => typeof attr === "string" && attr.length > 0).join(", "))
			.replace(/%%LINK%%/, data.link).replace(/%%LINK%%/, data.link)
		}

		// if (!data.subject ||data.subject.length < 1) throw "Email needs subject";
		// if ((!data.text_body || data.text_body.length < 1) && (!data.html_body || data.html_body.length < 1)) {
		// 	throw "Email needs message body, either html_body or text_body";
		// }
		// if (!data.subject ||data.subject.length < 1) throw "Email nees subject";

		this.messageData = {};
		this.messageData.sender = data.sender;
		this.messageData.to = data.to;
		this.messageData.subject = messageTemplates[data.messageType].messageSubject;
		this.messageData.text_body = messageTemplates[data.messageType].messageBodyText;
		// this.messageData.html_body = messageTemplates[data.messageType].messageBodyHTML;
		// if (data.text_body && data.text_body.length > 0) {
		// 	// this.messageData.text_body = "\""+ data.text_body + "\"" ;
		// 	this.messageData.text_body = data.text_body;
		// }
		// if (data.html_body && data.html_body.length > 0) {
		// 	// this.messageData.html_body = "\"" + data.html_body + "\"";
		// 	this.messageData.html_body = data.html_body;
		// }
		// this.messageData.api_key = api_key
		// console.log("messageData", this.messageData);
		// console.log("stringify:", JSON.stringify(this.messageData))
	}

	addDynamicContentToMessageBody(messageBody) {
		let newMessageBody = messageBody;
		//do some stuff
		// like, if user supplied messageBodyText, that would be applied here. Also, we would add the sender and hopefully recient's name
		//...
		return newMessageBody;
	}

	get messageBodyForInvite() {
		return this.addDynamicContentToMessageBody(messageBodyForInvite);
	}

	get messageBodyForCancel() {
		return this.addDynamicContentToMessageBody(messageBodyForCancel);
	}

	get messageBodyForUpdate() {
		return this.addDynamicContentToMessageBody(messageBodyForUpdate);
	}

	send(onSuccess, onError) {
		let me = this;
		this.onSuccess = onSuccess;
		this.onError = onError;
		let payload = Object.assign({}, me.messageData);
		database.ref("api_keys/smpt2go").once('value', function(snapshot) {
			let api_key = snapshot.val();
			console.log("api_key is ", api_key)
			payload.api_key = api_key;
			console.log(payload)
			$.ajax({
				url: me.url,
				method: 'POST',
				headers: {
					'Content-Type': "application/json"
				},
				data: JSON.stringify(payload),
			}).done(function(result) {
				console.log("success!")
				me.result = result;
				me.handleSuccess(result);
			}).fail(function(error) {
				console.log("error")
				me.handleError(error);
			});
		});

	}

	handleSuccess(data) {
		console.log("Sucess! Result: ", this.result, "data: ", data)
		console.log("this: ", this);
		if (typeof this.onSuccess === "function") this.onSuccess(data);
	}

	handleError(error) {
		console.log("Ooops. Error: ", error);
		if (typeof this.onError === "function") this.onError(error);
	}

}


/* to use this email class, you create an object with the email required parameters and then pass that object into Email constructor:
	required paramemters:
		sender  		(a single email address as a string)
		to 			(an array of email addresses to which the email will be sent)
		messageType	(one of a predefined message type, currently we support "invite", with plans to support "update", "cancel", and others)

	optional parameter
		messageBodyText (text that will go inplace of the template body text)

sample object
let emailInfo = {
	sender: "seml0021@umn.edu",
	to: [
		"semlak@gmail.com",
		"jsemlak@yahoo.com",
		"seml0021@umn.edu"
	],
	messageType: "invite"
}


then, to create an instance of the Email object:
	let email1 = new Email(emailInfo);

// the email is ready to send.
email1.send();

the send function also accepts optional parameters onSuccess and onError, which are callback functions that would be called on success or error.
email1.send(function(data) {
	// do something with 'data' info.
}, function(error) {
	// do something with 'error' info
})

note that it appears that the response on success from the email provider is pretty basic, so we will probably just want to tell user email was sent succesfully

*/

