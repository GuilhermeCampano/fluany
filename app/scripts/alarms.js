'use strict';

function Alarm(alarmName) {
  this.alarmName = alarmName;
}

Alarm.prototype.check = function (callback) {
  var _self = this;
  chrome.alarms.getAll(function (alarms) {

    var hasAlarm = alarms.some(function (a) {
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
    if (callback) callback(hasAlarm);
  });
};

Alarm.prototype.create = function () {
  chrome.alarms.create(this.alarmName, {
    delayInMinutes: 1,
    periodInMinutes: 1
  });
};

Alarm.prototype.cancel = function () {
  chrome.alarms.clear(this.alarmName);
  console.log("alarme cancelado!");
};

Alarm.prototype.toggle = function () {
  var _this = this;

  console.log("teste");
  //arrow function beacause escope :: this
  this.check(function (hasAlarm) {
    if (hasAlarm) {
      _this.cancel();
    } else {
      _this.create();
    }
    _this.check();
  });
};