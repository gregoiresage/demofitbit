import clock from "clock";
import document from "document";
import { today } from "user-activity";
import { preferences } from "user-settings";
import * as util from "../common/utils";

const InfoType = {
  Steps  :    1,
  Calories :  2,
  Distance :  3
};
const infos = [InfoType.Steps, InfoType.Calories, InfoType.Distance];
let   info  = 0;

let timeLabel    = document.getElementById("timeLabel");
let healthLabel  = document.getElementById("healthLabel");

function updateDisplay() {
  // update your time here
  let now = new Date();
  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(now.getMinutes());
  timeLabel.text = `${hours}:${mins}`;

  
  // update the health label
  switch(infos[info]) {
    case InfoType.Steps : 
      healthLabel.text = (today.adjusted.steps || 0) + " steps";
      break;
    case InfoType.Calories : 
      healthLabel.text = (today.adjusted.calories || 0) + " cals";
      break;
    case InfoType.Distance : 
      healthLabel.text = (today.adjusted.distance || 0) + " meters";
      break;
  }
}

document.getElementById("myButton").onclick = function(e) {
  info++;
  info = info % infos.length;
  updateDisplay();
}

// Update the clock every tick event
clock.granularity = "minutes";
clock.ontick = () => updateDisplay();

// Don't start with a blank screen
updateDisplay();