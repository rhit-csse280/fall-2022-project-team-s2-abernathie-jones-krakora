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
	constructor(auth, mAss, ass) {
		const fbAuthManager = auth;
		const fbMultiAssManager = mAss;
        const fbAssManager = ass;
		console.log("detail mode");

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
		//updateList();
	}
	updateList() {
		const newList = htmlToElement('<div id="detailPage" class="container page-container"></div>');
		for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
			const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
			const newCard = this._createCard(ass);
			newList.appendChild(newCard);
		}
		const oldList = document.querySelector("#dayList");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	}
	_createCard(todoItem) {
		return _htmlToElement(`<div class="card">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
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