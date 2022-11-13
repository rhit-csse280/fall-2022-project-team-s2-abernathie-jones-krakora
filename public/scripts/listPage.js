/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the list page.
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */


/** List Page Controller */

class ListController {
	constructor(auth, mAss) {
		console.log("list mode");
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

		rhit.fbMultiAssManager.beginListening(this.updateList.bind(this));

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
		this.updateList();
	}

	updateList() {
		const newList = this._htmlToElement('<div id="checklist"></div>');
		for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
			const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
			const newCard = this._createCard(ass.name);
			newList.appendChild(newCard);
		}
		const oldList = document.querySelector("#checklist");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	};

	_createElement(todoItem) {
		return this._htmlToElement(`<div class="card">
		<div class="card-body">
		  <div class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
			<label class="form-check-label" for="defaultCheck1">
			  ${todoItem}
			</label>
		  </div>
		</div>
	  </div>`);
	};
	_createCard(todoItem) {
		return this._htmlToElement(`<div class="card">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem}
				</label>
			</div>
		</div>
	</div>`);
	};
	_htmlToElement(html) {
		const template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	};
}

export { ListController };
