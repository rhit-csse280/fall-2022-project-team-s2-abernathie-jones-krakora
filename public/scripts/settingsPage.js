
class SettingsController {
    constructor(){
        this.color = null;
        this.root = document.querySelector(':root');
		//Sidebar navigation
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
            
        }
		const settingsItem = document.querySelector("#goToSettings");
        if(settingsItem) {
            document.querySelector("#goToSettings").addEventListener("click", (event) => {
                window.location.href = "/settings.html";
                console.log("Go to settings");
            });
            
        }
        
        rhit.fbUserManager.beginListening(rhit.fbAuthManager.uid, this.update.bind(this));

        //Change settings
        document.querySelector("#submitSettings").addEventListener("click", (event) => {
            if(document.querySelector("#redgreen").checked == true){
                console.log("passing redgreen");
                this.color = "redgreen";

                rhit.fbUserManager.updateColorSetting("redgreen")
            }else if(document.querySelector("#blueyellow").checked == true) {
                this.color = "blueyellow";
                console.log("Passing blueyellow");

                rhit.fbUserManager.updateColorSetting("blueyellow")}
            this.update();
        });
        document.querySelector("#clearSettings").addEventListener("click", (event) => {
            console.log("passing none");
            this.color = "none";

            rhit.fbUserManager.updateColorSetting("none");
            
            this.update();
        });
        this.update();
    }
    update(){
        
       if(rhit.fbUserManager.color != "none"){
        document.querySelector(`#${rhit.fbUserManager.color}`).checked = true;
            if(rhit.fbUserManager.color == "redgreen"){
                root.style.setProperty("--toolbar-color", "#FFFFFF");
                root.style.setProperty("--toggle-color", "#441052");
            }else if(rhit.fbUserManager.color == "blueyellow"){
                root.style.setProperty("--toolbar-color", "#DDDDDD");
                root.style.setProperty("--toggle-color", "#441052");
            }
       }else{
        document.querySelector("#redgreen").checked = false;
        document.querySelector("#blueyellow").checked = false;
       }
    }
}

export { SettingsController }