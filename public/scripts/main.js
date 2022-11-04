/**
 * @fileoverview
 * Provides the JavaScript interactions which are used on all pages.
 *
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Namespace */
var rhit = rhit || {};

/** Convert a string to an HTML template element */
htmlToElement = (html) => {		// TODO: May need to copy this to the individual pages, if applicable
	var template = document.createElement("template");
	template.innerHTML = html.trim();
	return template.content.firstChild;
}

// TODO: write authentication code

// TODO: write authorization code

/** Initialize the code for whichever page the user is on */
rhit.init = async () => {
	if (document.querySelector("#editPage")) {
		const { editMain } = await import("/public/scripts/editPage.js");
		editMain();
	}
	if (document.querySelector("#calendarPage")) {
		const { calendarMain } = await import("/public/scripts/calendarPage.js");
		calendarMain();
	}
	if (document.querySelector("#listPage")) {
		const { listMain } = await import("/public/scripts/listPage.js");
		listMain();
	}
}

/** Main */
rhit.main = () => {
	console.log("Ready");
	init();	// TODO: do this only once authorized probably
}

rhit.main();
