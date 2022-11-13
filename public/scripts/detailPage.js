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
		this.urlParams = new URLSearchParams(window.location.search);
		this.date = this.urlParams.get("date");
		this.weekday = this.urlParams.get("weekday");
		const day = this.date.slice(6);
		console.log(typeof(day));
		const dayofweek = this.weekday == 0 ? "Sunday":  this.weekday == 1 ?"Monday" : this.weekday == 2 ? "Tuesday" : this.weekday == 3 ? "Wednesday" : this.weekday == 4 ? "Thursday" :this.weekday == 5 ? "Friday" : "Saturday";

		const fbAssManager = null;
		
		console.log("detail mode");
		document.getElementById("date").textContent = `${dayofweek} November ${day}`;
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
		rhit.fbMultiAssManager.beginListening(this.updateList.bind(this));


		this.updateList();

		
	}
	updateList() {
		const newList = this._htmlToElement('<div id="day-list"></div>');
		if(rhit.fbMultiAssManager.length > 0){
			for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
				const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
				const newCard = this._createCard(ass);
				newList.appendChild(newCard);
			}
		 } else{
			 newList.appendChild(this._htmlToElement("</br><h6>Nothing scheduled!</h6>"));
		 }
		const oldList = document.querySelector("#day-list");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	}
	_createCard(todoItem) {
		return this._htmlToElement(`
    	<div onclick = "window.location.href= '/edit.html?id=${todoItem.id}&date=${this.date}&weekday=${this.weekday}'" class="card">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="false" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem.name}
				</label>
			</div>
            <p class="subjects card-subtitle">${todoItem.subject}</p>
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