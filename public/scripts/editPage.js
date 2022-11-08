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
		this._setStart(0);
		this._createDays(28);
	}
	_createDays = (numDays)=> {	// TODO: Create calendar and add to document
		const oldCalendar = document.querySelector("#calendar");
		const newCalendar = "";
		for(let i=1; i<=numDays; i++) {
			const card = this._htmlToElement(`
			<div class="card">
				<div class="card-body">
					${i}
				</div>
			</div>`);

		}
		oldCalendar.remove();
	}
	_htmlToElement = (html) => {		// TODO: May need to copy this to the individual pages, if applicable
		var template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
	_setStart = (offset)=> {
		document.querySelector("#calendar-spacer").style.width = `calc(${offset}*((100%/7) - 2px))`;
		document.querySelector("#calendar-spacer").style.margin = `${offset}px`;
	}
}
/** Edit Page Main */
export function editMain() {
	const editController = new EditController();
}