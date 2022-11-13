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

        //Edit an Assignment
        document.querySelector("#submitEditAss").addEventListener("click", (event) => {
			const name = document.querySelector("#inputName").value;
			const subject = document.querySelector("#inputClass").value;
            const date = document.querySelector("#inputDate").value;
            const priority = document.querySelector("#inputPriority").checked;

			rhit.fbSingleAssManager.update(name, subject, date, priority);
		});
        $("#editAssDialog").on("show.bs.modal", (event) => {
			console.log("dialog about to show up");
			document.querySelector("#inputName").value = rhit.fbSingleAssManager.name;
			document.querySelector("#inputClass").value = rhit.fbSingleAssManager.class;
            document.querySelector("#inputDate").value = rhit.fbSingleAssManager.date;
            document.querySelector("#inputPriority").checked = rhit.fbSingleAssManager.priority;
		});
		$("#editAssDialog").on("shown.bs.modal", (event) => {
			console.log("dialog is now visible");
			document.querySelector("#inputName").focus();
		});
        document.querySelector("#submitDeleteAss").addEventListener("click", (event) => {
			rhit.fbSingleAssManager.delete().then(function() {
				console.log("Document successfully deleted!");
			}).catch(function (error) {
				console.error("Error removing document: ", error);
			});
		});


		this.updateList();
	}
	updateList() {
		const newList = this._htmlToElement('<div id="day-list"></div>');
		for(let i = 0; i < rhit.fbMultiAssManager.length; i++) {
			const ass = rhit.fbMultiAssManager.getAssAtIndex(i);
			const newCard = this._createCard(ass);

            // newCard.onclick = (event) => {
            //     const assMan = rhit.FbSingleAssManager(ass.id);
            // }

			newList.appendChild(newCard);
		}
		const oldList = document.querySelector("#day-list");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	}
	_createCard(todoItem) {
		return this._htmlToElement(`
        <div class="card" data-toggle="modal" data-target="#editAss${todoItem.id}Dialog">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="false" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem.name}
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