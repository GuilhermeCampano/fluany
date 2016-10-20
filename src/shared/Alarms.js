export class Alarm {
  constructor(name, period){
    this._name = name;
    this._period = period;
  }

  check(callback){
    let _self = this;
    chrome.alarms.getAll(function(alarms) {

      var hasAlarm = alarms.some( (a) => {
        console.log('-> ', a);
        return a.name == _self._name;
      });

        if (callback)
          callback(hasAlarm);
    });
  }

  create(){
    console.log("create");
    chrome.alarms.create(this._name,
       {
          delayInMinutes: this._period,
          periodInMinutes: this._period
        }
    );
  }

  cancel(){
    chrome.alarms.clear(this._name);
    console.log("cancel");
  }

  toggle(){
    console.log("toggle");
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
}
