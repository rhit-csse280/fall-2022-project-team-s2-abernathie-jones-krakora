/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the edit page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Edit Page Controller */
class EditController {
	constructor() {
		console.log("edit mode");
		this._createCalendar(30, 1);
	}
	_createCalendar = (numDays, offset)=> {	// TODO: Create calendar and add to document
		const oldCalendar = document.querySelector("#calendar");
		const newCalendar = this._htmlToElement(`<div id="calendar">
				<div class="calendar-header">Sunday</div>
				<div class="calendar-header">Monday</div>
				<div class="calendar-header">Tuesday</div>
            	<div class="calendar-header">Wednesday</div>
            	<div class="calendar-header">Thursday</div>
            	<div class="calendar-header">Friday</div>
            	<div class="calendar-header">Saturday</div>
            	<div id="calendar-spacer"></div>
			</div>`);
		for(let i=1; i<=numDays; i++) {
			const card = this._htmlToElement(`
			<div class="card">
				<div class="card-body">
					${i}
				</div>
			</div>`);
			newCalendar.appendChild(card);
		}
		oldCalendar.parentElement.appendChild(newCalendar);
		oldCalendar.remove();

		document.querySelector("#calendar-spacer").style.width = `calc(${offset}*((100%/7) - 2px))`;
		document.querySelector("#calendar-spacer").style.margin = `${offset}px`;
	}
	_htmlToElement = (html) => {		// TODO: May need to copy this to the individual pages, if applicable
		var template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
}
/** Edit Page Main */
export function editMain() {
	const editController = new EditController();
}