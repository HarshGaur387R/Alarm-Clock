let checkBoxValue = 'off';



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
        }
        else {
            e.value = '';
        }
    });

});


function getUserInput() {
    if (userInputsField[0].value && userInputsField[1].value && userInputsField[2].value) {

        let total = 0;
        total += Number.parseInt(userInputsField[0].value) * 3600;
        total += Number.parseInt(userInputsField[1].value) * 60;
        total += Number.parseInt(userInputsField[2].value);

        return total;
    }

    return 0;
}

function playIsPressed() {

    let totalSeconds = getUserInput();

    // Checkpoint ... write a program to run timer on screen.

    let minutes = 0;
    let seconds = 0;
    let hours = 0;

    let s = setInterval(() => {
        if(totalSeconds >= 0){
            if(seconds == 60){
              minutes += 1;
              seconds = 0;
            }
            if(minutes == 60){
              hours += 1;
              minutes = 0;
              seconds = 0;
            }
            console.log(hours,minutes,seconds);
            seconds++;
            totalSeconds--;
        }
        else if(totalSeconds < 0){
            clearInterval(s);
        }
        
    }, 1);


    /* CheckPoint .....  */
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

let play = document.getElementById('play');
let pause = document.getElementById('pause');
let restart = document.getElementById('restart');

let lastActiveBtn = '';

play.addEventListener('click', () => {

    // Toggling Active and UnActive class in buttons;
    play.className == 'unActive' ? playIsPressed() : 0;

    play.className = 'Active';
    pause.className = 'unActive';
    restart.className = 'unActive';

});

pause.addEventListener('click', () => {

    // Toggling Active and UnActive class in buttons;

    play.className = 'unActive';
    pause.className = 'Active';
    restart.className = 'unActive';

});

restart.addEventListener('mousedown', () => {

    // On right click make it active.

    play.className = 'unActive';
    pause.className = 'unActive';
    restart.className = 'Active';
});
restart.addEventListener('touchstart', () => {

    // On right click make it active.
    restart.style.transition = 'none';

    play.className = 'unActive';
    pause.className = 'unActive';
    restart.className = 'Active';
});

restart.addEventListener('mouseup', () => {

    // On mouseUp make it unActive.

    play.className = 'unActive';
    pause.className = 'unActive';
    restart.className = 'unActive';
});
restart.addEventListener('touchend', () => {

    // On mouseUp make it unActive.
    restart.style.transition = 'none';

    play.className = 'unActive';
    pause.className = 'unActive';
    restart.className = 'unActive';
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