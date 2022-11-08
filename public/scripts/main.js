/**
 * @fileoverview
 * Provides the JavaScript interactions which are used on all pages.
 *
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Namespace */
var rhit = rhit || {};

rhit.FB_COLLECTION_USERS = "Users";
rhit.FB_KEY_NAME = "name";
rhit.FB_KEY_PHOTO_URL = "photoUrl";

rhit.fbAuthManager = null;
rhit.fbUserManager = null;

/** Convert a string to an HTML template element */
htmlToElement = (html) => {		// TODO: May need to copy this to the individual pages, if applicable
	var template = document.createElement("template");
	template.innerHTML = html.trim();
	return template.content.firstChild;
}

// TODO: write authentication code
rhit.FbUserManager = class {
	constructor() {
	  this._collectionRef = firebase.firestore().collection(rhit.FB_COLLECTION_USERS);
	  this._document = null;
	  this._unsubscribe = null;
	  console.log("created user manager");
	}
	addNewUserMaybe(uid, name, photoUrl) {
		const userRef = this._collectionRef.doc(uid);
		return userRef.get().then((doc) => {
			if(doc.exists) {
				console.log("Doc data", doc.data());
				return false;
			} else {
				console.log("no such doc");
				return userRef.set({
					[rhit.FB_KEY_NAME]: name,
					[rhit.FB_KEY_PHOTO_URL]: photoUrl
				}).then(function () {
					console.log("success");
					return true;
				}).catch(function (error) {
					console.log("error:", error);
				})
			}
		}).catch(function (error) {
			console.log("error getting doc", error);
		});
	}
	beginListening(uid, changeListener) {
		const userRef = this._collectionRef.doc(uid);
		
		this._unsubscribe = userRef.onSnapshot((doc) => {
			if(doc.exists) {
				this._document = doc;
				changeListener();
			} else {
				console.log("No user!");
			}
		});
	}
	stopListening() {
		this._unsubscribe();
	}

	get isListening() {
		return !!this._unsubscribe;
	}

	updatePhotoUrl(photoUrl) {
		const userRef = this._collectionRef.doc(rhit.fbAuthManager.uid);
		userRef.update({
			[rhit.FB_KEY_PHOTO_URL]: photoUrl,
		})
		.then(() => {
			console.log("update success");
		})
		.catch(function (error) {
			console.error("update error: ", error);
		});
	}
	updateName(name) {
		const userRef = this._collectionRef.doc(rhit.fbAuthManager.uid);
		return userRef.update({
			[rhit.FB_KEY_NAME]: name,
		})
		.then(() => {
			console.log("success");
		})
		.catch(function (error) {
			console.error("error ", error);
		});
	}
	get name() {   
		return this._document.get(rhit.FB_KEY_NAME); 
	}
	get photoUrl() {   
		return this._document.get(rhit.FB_KEY_PHOTO_URL); 
	}
}

// TODO: write authorization code
rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
		this._name = "";
		this._photoUrl = "";
		console.log("You have made the Auth Manager.");
	}

	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {

			this._user = user;
			changeListener();
		});

		
	}

	signIn() {
		// let rfUser = null;

		Rosefire.signIn("cfa5cbc7-dd88-4bd2-aa2c-e523d96a21a3", (err, rfUser) => {
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);
			this._name = rfUser.name;
			console.log("Set name to ", this._name);

			firebase.auth().signInWithCustomToken(rfUser.token).then((userCredential) => {
				// Signed in
				this._user = userCredential.user;
				console.log("customtoken", rfUser);
				// ...
			  }).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				if(errorCode === 'auth/invalid-custom-token') {
					alert('The token you provided is not valid.');
				} else {
					console.error("Custom auth error", errorCode, errorMessage);
				}
			});
		});
	}

	signOut() {
		firebase.auth().signOut().catch((error) => {
			console.log("Sign out error");
		});
	}

	startFirebaseUI = function () {
		var uiConfig = {
			signInSuccessUrl: '/',
			signInOptions: [
				firebase.auth.EmailAuthProvider.PROVIDER_ID,
				firebase.auth.PhoneAuthProvider.PROVIDER_ID,
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
			]
		};

		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		ui.start('#firebaseui-auth-container', uiConfig);
	}

	get isSignedIn() {
		return !!this._user;
	}

	get uid() {
		return this._user.uid;
	}

	get name() {
		return this._name || this._user.displayName;
	}

	get photoUrl() {
		return this._photoUrl || this._user.photoUrl;
	}
}

/** Initialize the code for whichever page the user is on */
rhit.init = async () => {
	if (document.querySelector("#editPage")) {
		const { editMain } = await import("/public/scripts/editPage.js");
		editMain(rhit.assignmentManger);
	}
	if (document.querySelector("#calendarPage")) {
		const { calendarMain } = await import("/public/scripts/calendarPage.js");
		calendarMain(rhit.AssignmentManager);
	}
	if (document.querySelector("#listPage")) {
		const { listMain } = await import("/public/scripts/listPage.js");
		listMain(rhit.assignmentManger);
	}
}
/** Main */
rhit.main = () => {
	console.log("Ready");
	rhit.init();	// TODO: do this only once authorized probably
	init();	// TODO: do this only once authorized probably
	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbUserManager = new rhit.FbUserManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log("isSignedIn = ", rhit.fbAuthManager.isSignedIn);
		rhit.createUserObjectIfNeeded().then((isUserNew) => {
			console.log('isUserNew :>> ', isUserNew);
			if(isUserNew) {
				window.location.href = "/list.html";
				return;
			}
			rhit.checkForRedirects();
			rhit.initializePage();
		});
		
	});
}

rhit.main();
