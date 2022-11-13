/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the calendar page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */


/** Detail Page Controller */


/** Detail Page Controller */
class DetailController {
	constructor() {
		const urlParams = new URLSearchParams(window.location.search);
		const date = urlParams.get("date");
		const weekday = urlParams.get("weekday");
		const day = date.slice(6);
		console.log(typeof(day));
		const dayofweek = weekday == 0 ? "Sunday":  weekday == 1 ?"Monday" : weekday == 2 ? "Tuesday" : weekday == 3 ? "Wednesday" : weekday == 4 ? "Thursday" :weekday == 5 ? "Friday" : "Saturday";

		const fbAssManager = null;
		
		console.log("detail mode");
		console.log(day)
		console.log(dayofweek)
		document.getElementById("date").textContent = `${dayofweek} November ${day}`;
        // Sidebar Navigation
        document.querySelector("#menuSignOut").addEventListener("click", (event) => {
			rhit.fbAuthManager.signOut();
		});
        const listItem = document.querySelector("#goToListPage");
        if(listItem) {
            document.querySelector("#goToListPage").addEventListener("click", (event) => {
                window.location.href = "/list.html";
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
		rhit.fbMultiAssManager.beginListening(updateList.bind(this));

		console.log(`date: ${date}  weekday: ${weekday}`);

		updateList();

		function updateList() {
			console.log(`2 date: ${date}  weekday: ${weekday}`);
			const newList = this._htmlToElement('<div id="day-list"></div>');
			for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
				const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
				const newCard = this._createCard(ass, date, weekday);
				newList.appendChild(newCard);
			}
			const oldList = document.querySelector("#day-list");
			oldList.parentElement.appendChild(newList);
			oldList.remove();
		}
	}
	
	_createCard(todoItem, date, weekday) {
		console.log(`3 date: ${date}  weekday: ${weekday}`);
		return this._htmlToElement(`
    	<div onclick = "window.location.href= '/edit.html?id=${todoItem.id}&date=${date}&weekday=${weekday}'" class="card" data-toggle="modal" data-target="#editAssDialog">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="false" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem.name}
				</label>
			</div>
		</div>
	</div>`);
	}
	_htmlToElement(html) {
		const template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
}

export { DetailController };