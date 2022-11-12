/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the edit page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Edit Page Controller */
fbAuthManager = null;
fbAssManager = null;
fbMultiAssManager = null;


class EditController {
	constructor(auth, mAss) {
		fbAuthManager = auth;
		fbMultiAssManager = mAss;
		console.log("edit mode");
		this._createCalendar(30, 1);
	}
	_createCalendar = (numDays, offset)=> {	// TODO: Create calendar and add to document
		const oldCalendar = document.querySelector("#ed-calendar");
		const newCalendar = this._htmlToElement(`<div id="ed-calendar">
				<div class="ed-calendar-header">Sunday</div>
				<div class="ed-calendar-header">Monday</div>
				<div class="ed-calendar-header">Tuesday</div>
            	<div class="ed-calendar-header">Wednesday</div>
            	<div class="ed-calendar-header">Thursday</div>
            	<div class="ed-calendar-header">Friday</div>
            	<div class="ed-calendar-header">Saturday</div>
            	<div id="ed-calendar-spacer"></div>
			</div>`);
		for(let i=1; i<=numDays; i++) {
			const card = this._htmlToElement(`
			<div data-date="${i}" class="card">
				<div class="card-body">
					${i}
				</div>
			</div>`);
			newCalendar.appendChild(card);
		}
		oldCalendar.parentElement.appendChild(newCalendar);
		oldCalendar.remove();

		document.querySelector("#ed-calendar-spacer").style.width = `calc(${offset}*((100%/7) - 2px))`;
		document.querySelector("#ed-calendar-spacer").style.margin = `${offset}px`;
	}
	_htmlToElement = (html) => {		// TODO: May need to copy this to the individual pages, if applicable
		var template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
}