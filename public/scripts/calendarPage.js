/**
 * @fileoverview
 * Provides JavaScript interactions exclusive to the calendar page
 * 
 * @author 
 * Corwin Jones, Allison Abernathie, Larissa Krakora
 */

/** Calendar Page Controller */
fbAuthManager = null;
fbAssManager = null;
fbMultiAssManager = null;

class CalendarController {
	constructor(auth, ass, mass) {
		fbAuthManager = auth;
		fbAssManager = ass;
		fbMultiAssManager = ass;
		console.log("calendar mode");
		document.querySelector("#submitAssignment").addEventListener("click", (event) =>{
			const name = document.querySelector("#inputName").value;
			const subject = document.querySelector("#inputClass").value;
			const date = document.querySelector("#inputDate").value;
			
		});
		$("#addAssignmentDialog").on("show.bs.modal", (event) =>{
			document.querySelector("#inputName").value = "";
			document.querySelector("#inputClass").value = "";
			document.querySelector("#inputDate").value = "";
		});
		$("#addAssignmentDialog").on("shown.bs.modal", (event) =>{
			document.querySelector("#inputName").focus();
		});
		updateList();
	};
	updateList(){

	}
}

/** Calendar Page Main */
export function calendarMain() {
	const calendarController = new CalendarController();
}