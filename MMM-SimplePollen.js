/* MagicMirror²
 * Module: MMM-SimplePollen
 *
 * Description: retrieve pollen details using Google Pollen API
 * 
 * By Aliaksei Sery
 * MIT Licensed.
 */
Module.register("MMM-SimplePollen", {
	// Default module config.
	defaults: {	
		days: 1,
		updateInterval: 3 * 60 * 60 * 1000, // every 3 hours
	},

	start: function() {
		Log.info("Starting module: " + this.name);

		var self = this;
		self.loaded = false;
		this.getPollenData();

		// TOOD figure out how to define update

		/*
		setInterval(function() {
			self.getData();
			self.updateDom(); 
		}, self.config.updateInterval); 
		*/
	},

	getHeader: function() {
		return "Pollen"
	},

	getDom: function() {
		if(this.loaded) {
			// TODO: table display
			var wrapper = document.createElement("div");
			wrapper.innerHTML = this.buildHtml(this.result);
			return wrapper;
		} else {
			var wrapper = document.createElement("div");
			wrapper.innerHTML = "Not ready yet";
			return wrapper;
		}		
	},

	buildHtml: function(payload) {
		console.log("POLLEN: Build HTML for " + payload);
		var pollenWrapper = document.createElement("table");
		pollenWrapper.setAttribute("class", "simple_pollen bright");
		var pollenInfos = payload.dailyInfo[0].pollenTypeInfo;

		// iterate over pollens
		for (var i = 0; i < pollenInfos.length; i++) {
			var pollen = pollenInfos[i];
			var pollenRow = document.createElement("tr");
			var pollenName = document.createElement("td");
			
			if(pollen.category) {
				pollenName.innerHTML = pollen.displayName + " : " + pollen.category;
			} else {
				pollenName.innerHTML = pollen.displayName;
			}
			
			pollenRow.appendChild(pollenName);
			pollenWrapper.appendChild(pollenRow);
		}

		return pollenWrapper.innerHTML;
	},

	getPollenData: function () {
		var url = "https://pollen.googleapis.com/v1/forecast:lookup" +
		"?key=" + this.config.apiKey + 
		"&location.longitude=" + this.config.longitude + 
		"&location.latitude=" + this.config.latitude + 
		"&days=" + this.config.days;

		console.log('POLLEN: Send notification to get data from ' + url)
        this.sendSocketNotification(url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "SIMPLEPOLLEN_RESULT") {
			console.log("POLLEN: Notification received");
			console.log(payload);
            this.result = payload;
            this.loaded = true;
            this.updateDom();
        }
    }
});
