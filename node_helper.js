var NodeHelper = require('node_helper');

module.exports = NodeHelper.create({

  start: function () {
    console.log('MMM-SimplePollen helper started..');
  },

  getData: async function (url) {
    console.log("POLLEN: getting results")
    response = await fetch(url);
    const json = await response.json();
    
    this.sendSocketNotification('SIMPLEPOLLEN_RESULT', json);
  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(payload) {
    console.log("POLLEN: helper got socket notification")
    this.getData(payload);
  }
});