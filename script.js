// Filtering user input

let userInputsField = Array.from(document.getElementsByClassName('usrInput'));

userInputsField.forEach((e,index)=>{
    e.addEventListener('input',()=>{
        if (e.value != '') {
            if (e.value.length > 2) {
                
                let extraDigit = e.value[e.value.length-1];
                e.value = e.value.substring(0,2);

                if (index+1 < 3) {
                    userInputsField[index+1].value = extraDigit;
                    userInputsField[index+1].focus();
                }
            }
        }
        else{
            e.value = '';
        }
    });

});


document.getElementById('checkbox').addEventListener('change',()=>{

    console.log(document.getElementById('checkbox').value);
})


window.addEventListener('load',()=>{
    userInputsField[0].value = '';
    userInputsField[1].value = '';
    userInputsField[2].value = '';
});

// function lol() {
//     console.log('ad');
// }