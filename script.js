let checkBoxValue = 'off';

let sec = 0;
let min = 0;
let hour = 0;

let interval = null;

let play = document.getElementById('play');
let pause = document.getElementById('pause');
let restart = document.getElementById('restart');

// => Filtering user input.
let userInputsField = Array.from(document.getElementsByClassName('usrInput'));

userInputsField.forEach((e, index) => {
  e.addEventListener('input', () => {
    if (e.value != '') {
      if (e.value.length > 2) {

        let extraDigit = e.value[e.value.length - 1];
        e.value = e.value.substring(0, 2);

        if (index + 1 < 3) {
          userInputsField[index + 1].value = extraDigit;
          userInputsField[index + 1].focus();
        }
      }
      if (Number.parseInt(e.value) > 59 && index > 0) {
        e.value = '59';
      }
    }
    else {
      e.value = '';
    }

    clearInterval(interval);
    putNumbersOnScreen(0, 0, 0);
    min = 0; sec = 0; hour = 0;
    play.className = 'unActive';
  });

});


/* => Function converts given input into numbers. */
function getUserInput() {
  if (!userInputsField[0].value) {
    userInputsField[0].value = 0;
  }
  if (!userInputsField[1].value) {
    userInputsField[1].value = 0;
  }
  if (!userInputsField[2].value) {
    userInputsField[2].value = 0;
  }

  return { hour: Number.parseInt(userInputsField[0].value), minutes: Number.parseInt(userInputsField[1].value), seconds: Number.parseInt(userInputsField[2].value) };

}

/* => Function shows the timer on screen. */
function putNumbersOnScreen(hour, minutes, seconds) {

  let hourBox = document.getElementById('hourBox');
  let minBox = document.getElementById('minBox');
  let secBox = document.getElementById('secBox');


  let sh = hour.toString();
  if (sh.length < 2) {
    sh = '0' + sh;
  }
  hourBox.firstElementChild.innerHTML = sh;


  let sm = minutes.toString();
  if (sm.length < 2) {
    sm = '0' + sm;
  }
  minBox.firstElementChild.innerHTML = sm;


  let ss = seconds.toString();
  if (ss.length < 2) {
    ss = '0' + ss;
  }
  secBox.firstElementChild.innerHTML = ss;

}


function playIsPressed() {
  let deadEnd = false;
  let givenTime = getUserInput();
  if (givenTime.hour == 0 && givenTime.minutes == 0 && givenTime.seconds == 0) {
    return;
  }

  interval = setInterval(() => {
    if (play.className == 'unActive') {
      play.className = 'Active';
    }
    if (pause.className == 'Active') {
      pause.className = 'unActive';
    }

    if (min == 60) {
      hour++;
      min = 0;
      sec = 0;
    }

    if (sec == 60) {
      min++;
      sec = 0;
    }

    if (givenTime.hour == hour && givenTime.minutes == min && givenTime.seconds == sec) {
      play.className = 'unActive';
      deadEnd = 1;
      clearInterval(interval);
    }

    putNumbersOnScreen(hour, min, sec);

    if (deadEnd == 1) {
      sec = 0; min = 0; hour = 0;
      deadEnd = 0
    }
    sec++;

  }, 1000);
}

function pauseIsPressed() {
  if (pause.className == 'unActive') {
    pause.className = 'Active';
  }
  if (play.className == 'Active') {
    play.className = 'unActive';
  }
  clearInterval(interval);
}

function restartIsPressed() {

  sec = 0;
  min = 0;
  hour = 0;
  clearInterval(interval);

  if (play.className == 'Active') {
    play.className = 'unActive';
  }
  else if (pause.className == 'Active') {
    pause.className = 'unActive';
  }
  putNumbersOnScreen(hour, min, sec);

}

// => Set check box value 'On' if value is 'Off', keep toggling it.

document.getElementById('checkbox').addEventListener('change', () => {

  if (checkBoxValue == 'on') {
    checkBoxValue = 'off';

    userInputsField.forEach((e) => {
      e.removeAttribute('readonly');
    });
  }
  else {
    checkBoxValue = 'on';
    userInputsField.forEach((e) => {
      e.setAttribute('readonly', 'true');
    });
  }
});


// => Making Buttons work;


play.addEventListener('click', () => {

  if (play.className == 'unActive') {
    playIsPressed();
  }

});

pause.addEventListener('click', () => {

  pauseIsPressed();

});


restart.addEventListener('mouseup', () => {

  restartIsPressed();

});

restart.addEventListener('touchend', () => {

  restartIsPressed();

});

// => On load turn off the check box. 

window.addEventListener('load', () => {
  document.getElementById('checkbox').checked = false;
});

// => On load set 0 to the user Input fields.

window.addEventListener('load', () => {
  userInputsField[0].value = '0';
  userInputsField[1].value = '0';
  userInputsField[2].value = '0';
});