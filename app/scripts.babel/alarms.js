function Alarm (alarmName, period){
  this.alarmName = alarmName;
  this.period = period;
}

Alarm.prototype.check = function(callback){
  let _self = this;
  chrome.alarms.getAll(function(alarms) {    

    var hasAlarm = alarms.some( (a) => {
      console.log('-> ', a);
      return a.name == _self.alarmName;
    });
      
      if (callback) 
        callback(hasAlarm);
  });

}

Alarm.prototype.create = function() {
  console.log("Alarme created");
  chrome.alarms.create(this.alarmName, {
      delayInMinutes: this.period,
      periodInMinutes: this.period
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