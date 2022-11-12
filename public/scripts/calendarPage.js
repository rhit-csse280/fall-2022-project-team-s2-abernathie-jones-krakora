/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the calendar page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Singletons for authorization */
fbAuthManager = null;
fbAssManager = null;
fbMultiAssManager = null;

/** Calendar Page Controller */
class CalendarController {
	constructor(auth, mAss) {
		fbAuthManager = auth;
		fbMultiAssManager = mAss;
		console.log("calendar mode");
		document.querySelector("#submitAssignment").addEventListener("click", event => {
			const name = document.querySelector("#inputName").value;
			const subject = document.querySelector("#inputClass").value;
			const date = document.querySelector("#inputDate").value;
			rhit.fbMultiAssManager.add(name, subject, date);
		});
		$("#addAssignmentDialog").on("show.bs.modal", event => {
			document.querySelector("#inputName").value = "";
			document.querySelector("#inputClass").value = "";
			document.querySelector("#inputDate").value = "";
		});
		$("#addAssignmentDialog").on("shown.bs.modal", event => {
			document.querySelector("#inputName").focus();
		});
		updateList();
	}
	updateList() {
		const newList = htmlToElement('<div id="calendarPage" class="container page-container"></div>');
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
