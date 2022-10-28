/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** namespace. */
var rhit = rhit || {};

function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
}

rhit.editController = class {
	constructor(){
		console.log("edit mode");
	}
};
rhit.calendarController = class {
	constructor(){
		console.log("calendar mode");
	}
};
rhit.listController = class {
	constructor(){
		console.log("list mode");
		document.querySelector("#fab").addEventListener("click", (event) =>{
			this.updateList();
		});
	}

	updateList(){
		const newCheck = this._createElement("place holder");

		const checklist = document.querySelector("#checklist");
		checklist.appendChild(newCheck);
	};

	_createElement(todoItem){
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
};


/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");
	if(document.querySelector("#editPage")){
		
		new rhit.editController();
	}
	if(document.querySelector("#calendarPage")){
		
		new rhit.calendarController();
	}
	if(document.querySelector("#listPage")){
		
		new rhit.listController();
	}

};

rhit.main();
