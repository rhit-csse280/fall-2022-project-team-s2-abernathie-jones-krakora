/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the list page.
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */


/** List Page Controller */
fbAuthManager = null;
fbAssManager = null;
fbMultiAssManager = null;


class ListController {
	constructor(auth, mAss) {
		fbAuthManager = auth;
		fbMultiAssManager = mAss;
		console.log("list mode");
		document.querySelector("#fab").addEventListener("click", (event) => {
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
		oldList.removeAttribute("id");
		oldList.hidden = true;

		oldList.parentElement.appendChild(newList);
	};

	_createElement(todoItem) {
		return htmlToElement(`<div class="card">
		<div class="card-body">
		  <div class="form-check">
			<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
			<label class="form-check-label" for="defaultCheck1">
			  ${todoItem}
			</label>
		  </div>
		</div>
	  </div>`)
	}
}
