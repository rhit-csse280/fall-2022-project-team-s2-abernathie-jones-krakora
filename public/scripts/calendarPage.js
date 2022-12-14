/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the calendar page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */


/** Calendar Page Controller */

class CalendarController {
	constructor() {
		console.log("Calendar mode");
		this._createCalendar(30, 2);

		// Sidebar Navigation
        document.querySelector("#menuSignOut").addEventListener("click", (event) => {
			rhit.fbAuthManager.signOut();
		});
		const listItem = document.querySelector("#goToListPage");
        if(listItem) {
            document.querySelector("#goToListPage").addEventListener("click", (event) => {
                window.location.href = `/list.html?uid=${rhit.fbAuthManager.uid}`;
                console.log("Go to list");
            });
        }
        const calendarItem = document.querySelector("#goToCalendarPage");
        if(calendarItem) {
            document.querySelector("#goToCalendarPage").addEventListener("click", (event) => {
                window.location.href = "/calendar.html";
                console.log("Go to calendar");
            });
            
        }
		const settingsItem = document.querySelector("#goToSettings");
        if(settingsItem) {
            document.querySelector("#goToSettings").addEventListener("click", (event) => {
                window.location.href = "/settings.html";
                console.log("Go to settings");
            });
            
		}
		//handling adding assignments
		document.querySelector("#submitAssignment").addEventListener("click", event => {
			const name = document.querySelector("#inputName").value;
			const subject = document.querySelector("#inputClass").value;
			const date = document.querySelector("#inputDate").value;
			const priority = document.querySelector("#inputPriority").checked;
			rhit.fbMultiAssManager.add(name, subject, date, priority);
		});
		$("#addAssignmentDialog").on("show.bs.modal", event => {
			document.querySelector("#inputName").value = "";
			document.querySelector("#inputClass").value = "";
			document.querySelector("#inputDate").value = "";
			document.querySelector("#inputPriority").checked = false;
		});
		$("#addAssignmentDialog").on("shown.bs.modal", event => {
			document.querySelector("#inputName").focus();
		});
		
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
			<div onclick = 'window.location.href = "/detail.html?uid=${rhit.fbAuthManager.uid}&date=202211${day}&weekday=${(offset + i - 1)%7}"' data-date="${day}" class="card">
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

export { CalendarController };