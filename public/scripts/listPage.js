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
		const fbAuthManager = auth;
		const fbMultiAssManager = mAss;
		console.log("list mode");
		document.querySelector("#fab").addEventListener("click", event => {
			this.updateList();
		});
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
	};

	_createElement(todoItem) {
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

export { ListController };
