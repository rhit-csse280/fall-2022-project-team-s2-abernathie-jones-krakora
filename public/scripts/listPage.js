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
		const newCheck = this._createElement("place holder");

		const checklist = document.querySelector("#checklist");
		checklist.appendChild(newCheck);
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

/** List Page Main */
export function listMain() {
	const listController = new ListController();
}