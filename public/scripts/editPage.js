
class EditController {
    constructor(){
        const urlParams = new URLSearchParams(window.location.search);
		const date = urlParams.get("date");
		const weekday = urlParams.get("weekday");

		//Sidebar navigation
        document.querySelector("#menuSignOut").addEventListener("click", (event) => {
			rhit.fbAuthManager.signOut();
		});
		const listItem = document.querySelector("#goToListPage");
        if(listItem) {
            document.querySelector("#goToListPage").addEventListener("click", (event) => {
                window.location.href = `/list.html?uid=${rhit.fbAuthManager.uid}`;
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
        rhit.fbAssManager.beginListening(this.updateList.bind(this));

        //Edit an Assignment
        document.querySelector("#submitEditAss").addEventListener("click", (event) => {
            const name = document.querySelector("#inputName").value;
            const subject = document.querySelector("#inputClass").value;
            const date = document.querySelector("#inputDate").value;
            const priority = document.querySelector("#inputPriority").checked;
            
            rhit.fbAssManager.update(name, subject, date, priority).then(function() { 
                console.log("int then");
                window.location.href = `/detail.html?uid=${rhit.fbAuthManager.uid}&date=${date}&weekday=${weekday}`})
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
        $("#editAssDialog").on("show.bs.modal", (event) => {
            console.log("dialog about to show up");
            document.querySelector("#inputName").value = rhit.fbAssManager.name;
            document.querySelector("#inputClass").value = rhit.fbAssManager.sub;
            document.querySelector("#inputDate").value = rhit.fbAssManager.date;
            document.querySelector("#inputPriority").checked = rhit.fbAssManager.priority;
        });
        $("#editAssDialog").on("shown.bs.modal", (event) => {
            console.log("dialog is now visible");
            document.querySelector("#inputName").focus();
        });
        document.querySelector("#submitDeleteAss").addEventListener("click", (event) => {
            rhit.fbAssManager.delete().then(function() {
                console.log("Document successfully deleted!");
                window.location.href = `/detail.html?uid=${rhit.fbAuthManager.uid}&date=${date}&weekday=${weekday}`;
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
        document.querySelector("#cancelEditAss").addEventListener("click", (event) => {
            window.location.href = `/detail.html?uid=${rhit.fbAuthManager.uid}&date=${date}&weekday=${weekday}`;

        });

        this.updateList();
    }
    updateList() {
		const newList = this._htmlToElement('<div id="editCard"></div>');
        const ass = rhit.fbAssManager.ass;
        const newCard = this._createCard(ass);
        newList.appendChild(newCard);
	
		const oldList = document.querySelector("#editCard");
		oldList.parentElement.appendChild(newList);
		oldList.remove();
	};
    _createCard(todoItem) {
		return this._htmlToElement(`
    	<div class="card">
		<div class="card-body">
			<div class="form-check">
				<input class="form-check-input" type="checkbox" value="false" id="defaultCheck1">
				<label class="form-check-label" for="defaultCheck1">
					${todoItem.name}
				</label>
			</div>
			<p class="subjects card-subtitle">${todoItem.subject}</p>
		</div>
	</div>`);
	}
    _htmlToElement(html) {
		const template = document.createElement("template");
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}


}

export { EditController }