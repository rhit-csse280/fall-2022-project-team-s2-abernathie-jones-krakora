/**
 * @fileoverview
 * Provides the JavaScript interactions which are used on all pages.
 *
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Namespace */
var rhit = rhit || {};

/** Firebase keys */
rhit.FB_COLLECTION_USERS = "Users";
rhit.FB_KEY_NAME = "name";
rhit.FB_KEY_PHOTO_URL = "photoUrl";
rhit.FB_KEY_ASSNAME = "assName";
rhit.FB_KEY_ASSSUB = "assSub";
rhit.FB_KEY_ASSDATE = "assDate";
rhit.FB_KEY_PRIORITY = "assPri";
rhit.FB_KEY_AUTHOR = "author";

/** Singleton objects */
rhit.fbAuthManager = null;
rhit.fbUserManager = null;
rhit.fbAssManager = null;
rhit.fbMultiAssManager = null;

/** Convert a string to an HTML template element */
// htmlToElement = (html) => {
// 	var template = document.createElement("template");
// 	template.innerHTML = html.trim();
// 	return template.content.firstChild;
// }

/** Assignment object */
rhit.Ass = class {
	constructor(id, name, subject, date, priority) {
		this.id = id;
		this.name = name;
		this.subject = subject;
		this.date = date;
		this.priority = priority;
	}
}

/** Firebase User Manager */
rhit.FbUserManager = class {
	constructor() {
		this._collectionRef = firebase.firestore().collection(rhit.FB_COLLECTION_USERS);
		this._document = null;
		this._unsubscribe = null;
		console.log("created user manager");
	}
	addNewUserMaybe(uid, name, photoUrl) {	// Add new user, if one doesn't already exist
		const userRef = this._collectionRef.doc(uid);
		return userRef.get().then(doc => {
			if (doc.exists) {
				console.log("Doc data", doc.data());
				return false;
			} else {
				console.log("no such doc");
				return userRef.set({
					[rhit.FB_KEY_NAME]: name,
					[rhit.FB_KEY_PHOTO_URL]: photoUrl
				}).then(() => {
					console.log("success");
					return true;
				}).catch(error => { console.log("error:", error); })
			}
		}).catch(error => { console.log("error getting doc", error); });
	}
	beginListening(uid, changeListener) {
		const userRef = this._collectionRef.doc(uid);
		this._unsubscribe = userRef.onSnapshot((doc) => {
			if (doc.exists) {
				this._document = doc;
				changeListener();
			} else console.log("No user!");
		});
	}
	stopListening() { this._unsubscribe(); }
	updatePhotoUrl(photoUrl) {
		const userRef = this._collectionRef.doc(rhit.fbAuthManager.uid);
		userRef.update({ [rhit.FB_KEY_PHOTO_URL]: photoUrl, })
			.then(() => { console.log("update success");})
			.catch(error => { console.error("update error: ", error); });
	}
	updateName(name) {
		const userRef = this._collectionRef.doc(rhit.fbAuthManager.uid);
		return userRef.update({ [rhit.FB_KEY_NAME]: name, })
			.then(() => { console.log("success"); })
			.catch(error => { console.error("error ", error); });
	}
	get name() { return this._document.get(rhit.FB_KEY_NAME); }
	get photoUrl() { return this._document.get(rhit.FB_KEY_PHOTO_URL); }
	get isListening() { return !!this._unsubscribe; }
}

/** Login page controller */
rhit.LoginPageController = class {
	constructor() {
		console.log("Created Login page controller");
		document.querySelector("#rosefireButton").addEventListener("click", event => { rhit.fbAuthManager.signIn();	});
		rhit.fbAuthManager.startFirebaseUI();
	}
}

/** Manages login state, I think???? */
rhit.FbAuthManager = class {
	constructor() {
		this._user = null;
		this._name = "";
		this._photoUrl = "";
		console.log("You have made the Auth Manager.");
	}
	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged(user => {
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
				if (errorCode === 'auth/invalid-custom-token') alert('The token you provided is not valid.');
				else console.error("Custom auth error", errorCode, errorMessage);
			});
		});
	}
	signOut() { firebase.auth().signOut().catch(error => { console.error("Sign out error"); });	}
	startFirebaseUI() {
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
	get isSignedIn() { return !!this._user; }
	get uid() { return this._user.uid; }
	get name() { return this._name || this._user.displayName; }
	get photoUrl() { return this._photoUrl || this._user.photoUrl; }
}

/** Asignment manager for single assignments */
rhit.FbAssManager = class {
	constructor(assID) {
		this._documentSnapshot = {};
		this._unsubscribe = null;
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_USERS).doc(assID);
		console.log(`Listening to ${this._ref.path}`)
	}
	beginListening(changeListener) {
		if (this._uid) query = query.where(rhit.FB_KEY_AUTHOR, "==", this._uid);
		this._unsubscribe = this._ref.onSnapshot(doc => {
			if (doc.exists) {
				console.log("Document data:", doc.data());
				this._documentSnapshot = doc;
				changeListener();
			} else console.log("No such document!"); // doc.data() will be undefined in this case
		});
	}
	stopListening() { this._unsubscribe(); }
	
	update(name, subject, date, priority) {
		this._ref.update({
			[rhit.FB_KEY_ASSNAME]: name,
			[rhit.FB_KEY_ASSSUB]: subject,
			[rhit.FB_KEY_ASSDATE]: date,
			[rhit.FB_KEY_PRIORITY]: priority,
		})
			.then(() => { console.log("Document updated!"); })
			.catch(error => { console.error("Error adding document: ", error); });
	}
	delete() { return this._ref.delete() }
	get name() { return this._documentSnapshot.get(rhit.FB_KEY_ASSNAME); }
	get sub() { return this._documentSnapshot.get(rhit.FB_KEY_ASSSUB); }
	get date() { return this._documentSnapshot.get(rhit.FB_KEY_ASSDATE); }
	get author() { return this._documentSnapshot.get(rhit.FB_KEY_AUTHOR); }
	get priority() { return this._documentSnapshot.get(rhit.FB_KEY_PRIORITY); }
	get ass() {
		const ass = new rhit.Ass(
			this._documentSnapshot.id,
			this._documentSnapshot.get(rhit.FB_KEY_ASSNAME),
			this._documentSnapshot.get(rhit.FB_KEY_ASSSUB),
			this._documentSnapshot.get(rhit.FB_KEY_ASSDATE),
			this._documentSnapshot.get(rhit.FB_KEY_PRIORITY),
		);
		return ass;
	}
}

/** Assignment manager for lists of assignments */
rhit.FbMultiAssManager = class {
	constructor(uid) {
		console.log("Manager exists");
		this._uid = uid;
		this._documentSnapshots = [];
		this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_USERS);
		this._unsubscribe = null;
	}
	add(name, subject, date, priority) {
		this._ref.add({
			[rhit.FB_KEY_ASSNAME]: name,
			[rhit.FB_KEY_ASSSUB]: subject,
			[rhit.FB_KEY_ASSDATE]: date,
			[rhit.FB_KEY_AUTHOR]: rhit.fbAuthManager.uid,
			[rhit.FB_KEY_PRIORITY]: priority,
		})
			.then(docRef => { console.log("Document written with ID: ", docRef.id); })
			.catch(error => { console.error("Error adding document: ", error); });
		console.log(` Dodad added as: ${name} ${subject}`);
	}
	beginListening(changeListener) {
		let query = this._ref;
		if (this._uid) {
			query = query.where(rhit.FB_KEY_AUTHOR, "==", this._uid);
		}
		if (document.querySelector("#listPage")){
			query = query.where(rhit.FB_KEY_PRIORITY, "==", true)
		}
		if (document.querySelector("#detailPage")){
			const urlParams = new URLSearchParams(window.location.search);
			const date = urlParams.get("date");
			query = query.where(rhit.FB_KEY_ASSDATE, "==", date)
		}
		this._unsubscribe = query
			.onSnapshot(querySnapshot => {
				this._documentSnapshots = querySnapshot.docs;
				// querySnapshot.forEach((doc) => {
				// 	console.log(doc.data());
				// });
				changeListener();
			});
	}
	stopListening() { this._unsubscribe(); };
	update(id, name, subject) { }	// TODO
	delete(id) { }	// TODO
	getAssAtIndex(index) {
		const documentSnapshot = this._documentSnapshots[index];
		const ass = new rhit.Ass(
			documentSnapshot.id,
			documentSnapshot.get(rhit.FB_KEY_ASSNAME),
			documentSnapshot.get(rhit.FB_KEY_ASSSUB),
			documentSnapshot.get(rhit.FB_KEY_ASSDATE),
			documentSnapshot.get(rhit.FB_KEY_PRIORITY),
		);
		return ass;
	}
	get length() { return this._documentSnapshots.length; }
	get uid() { return this._uid; }
}

/** Redirect if necessary */
rhit.checkForRedirects = () => {
	if (document.querySelector("#loginPage") && rhit.fbAuthManager.isSignedIn) window.location.href = "/calendar.html";
	if (!document.querySelector("#loginPage") && !rhit.fbAuthManager.isSignedIn) window.location.href = "/";
}

/** Initialize the code for whichever page the user is on */
rhit.init = async () => {
	
	if (document.querySelector("#loginPage")) new rhit.LoginPageController();
	else {
		const urlParams = new URLSearchParams(window.location.search);
		const uid = urlParams.get("uid");
		rhit.fbMultiAssManager = new rhit.FbMultiAssManager(uid);
		if (document.querySelector("#editPage")) {
			const assID = urlParams.get("id");
			rhit.fbAssManager = new rhit.FbAssManager(assID);
			console.log("Ass Manager is here")
			import("./editPage.js").then((Module)=> {
				new Module.EditController();
			});
		}
		if (document.querySelector("#calendarPage")) {
			import("./calendarPage.js").then((Module)=> {
				new Module.CalendarController();
			});
		}
		if (document.querySelector("#listPage")) {
			import("./listPage.js").then((Module)=> {
				new Module.ListController();
			});
		}
		if (document.querySelector("#detailPage")) {
			import("./detailPage.js").then((Module)=> {
				new Module.DetailController();
			})
			
		}
	}
}

/** Check if a user has just logged in, call the UserManager */
rhit.createUserObjectIfNeeded = () => {
	return new Promise((resolve, reject) => {
		if (!rhit.fbAuthManager.isSignedIn) {
			resolve(false);
			return;
		}
		if (!document.querySelector("#loginPage")) {
			resolve(false);
			return;
		}
		rhit.fbUserManager.addNewUserMaybe(
			rhit.fbAuthManager.uid,
			rhit.fbAuthManager.name,
			rhit.fbAuthManager.photoUrl,
		).then((isUserNew) => { resolve(isUserNew); });
	});
}

/** Main */
rhit.main = () => {
	console.log("Ready");
	rhit.fbAuthManager = new rhit.FbAuthManager();
	rhit.fbUserManager = new rhit.FbUserManager();
	rhit.fbAuthManager.beginListening(() => {
		console.log("isSignedIn = ", rhit.fbAuthManager.isSignedIn);
		rhit.createUserObjectIfNeeded().then((isUserNew) => {
			console.log('isUserNew :>> ', isUserNew);
			if (isUserNew) {
				window.location.href = "/list.html";
				return;
			}
			rhit.checkForRedirects();
			rhit.init();
		});
	});
}

/** Call main */
rhit.main();
