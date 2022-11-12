/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the edit page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */


/** Edit Page Controller */

class EditController {
	constructor(auth, mAss) {
		const fbAuthManager = auth;
		const fbMultiAssManager = mAss;
		console.log("edit mode");
		this._createCalendar(30, 1);

	}
	_createCalendar = (numDays, offset)=> {
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
			let day = null;
			if(i < 10){
				day = "0"+i;
			}else {
				day = i;
			}
			const card = this._htmlToElement(`
			<div onclick = 'window.location.href = "/detail.html?date=202211${day}&weekday=${(offset + i)%7};"' data-date="${day}" class="card">
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
	_htmlToElement (html) {
		const template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
}

export { EditController };