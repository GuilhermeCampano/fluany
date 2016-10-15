function Alarm (alarmName){
  this.alarmName = alarmName;
}

Alarm.prototype.check = function(callback){
  let _self = this;
  chrome.alarms.getAll(function(alarms) {    

    var hasAlarm = alarms.some( (a) => {
      console.log('-> ', a);
      return a.name == _self.alarmName;
    });

    var newLabel;
    if (hasAlarm) {
      newLabel = 'Cancel alarm';
    } else {
      newLabel = 'Activate alarm';
    }
      document.getElementById('toggleAlarm').innerText = newLabel;
      if (callback) 
        callback(hasAlarm);
  });

}

Alarm.prototype.create = function() {
  chrome.alarms.create(this.alarmName, {
      delayInMinutes: 1,
      periodInMinutes: 1
    }
  );
}

Alarm.prototype.cancel = function() {
  chrome.alarms.clear(this.alarmName);
  console.log("alarme cancelado!");
}

Alarm.prototype.toggle =  function() {
  console.log("teste");
  //arrow function beacause escope :: this
  this.check((hasAlarm) => {
    if (hasAlarm) {
      this.cancel();
    } else {
      this.create();
    }
      this.check();
  });
}