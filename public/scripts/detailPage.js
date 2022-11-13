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
		const fbAssManager = null;

		console.log("detail mode");

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
        }rhit.fbMultiAssManager.beginListening(this.updateList.bind(this));


		this.updateList();
	}
	updateList() {
		const newList = this._htmlToElement('<div id="day-list"></div>');
		for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
			const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
			const newCard = this._createCard(ass.name);

            // newCard.onclick = (event) => {
            //     const assMan = rhit.fbAssManager(ass.id);
            // }
			newCard.onclick = (event)=>{
				//console.log(`You clicked on ${mq.id}`);
				//rhit.storage.setMovieQuoteID(mq.id);

				window.location.href = `/edit.html?id=${ass.id}`;

			}
			newList.appendChild(newCard);
		}
		const oldList = document.querySelector("#day-list");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	}
	_createCard(todoItem) {
		return this._htmlToElement(`
        <div "class="card" data-toggle="modal" data-target="#editAssDialog">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="false" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem}
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