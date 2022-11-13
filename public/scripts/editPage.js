
class editController {
    constructor(){
        const urlParams = new URLSearchParams(window.location.search);
		const date = urlParams.get("date");
		const weekday = urlParams.get("weekday");
        //Edit an Assignment
        document.querySelector("#submitEditAss").addEventListener("click", (event) => {
            const name = document.querySelector("#inputName").value;
            const subject = document.querySelector("#inputClass").value;
            const date = document.querySelector("#inputDate").value;
            const priority = document.querySelector("#inputPriority").checked;
            
            rhit.fbAssManager.update(name, subject, date, priority);
        });
        $("#editAssDialog").on("show.bs.modal", (event) => {
            console.log("dialog about to show up");
            document.querySelector("#inputName").value = rhit.fbAssManager.name;
            document.querySelector("#inputClass").value = rhit.fbAssManager.class;
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
                window.location.href = `/detail.html?date=${date}&weekday=${weekday}`;
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
    }


}

export { editController }