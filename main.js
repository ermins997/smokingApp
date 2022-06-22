const quitDateInfo = document.querySelector('#quitDateInfo');
const elapsed = document.querySelector('#elapsed');
const noCigarNumber = document.querySelector('#no-cigar-number');
const saveBtn = document.querySelector('#saveBtn');
const moneySaved = document.querySelector('#money-saved');

const dateInput = document.querySelector('[type="datetime-local"]');
const numCigarsInput = document.querySelector('#num-cigars');
const pricePerPack = document.querySelector('#price-per-pack');

initApp();

saveBtn.addEventListener('click', saveData);

function saveData(){
   let qd = moment(dateInput.value).format();
   let ppp = pricePerPack.value;
   let noc = numCigarsInput.value;

    localStorage.newQuiteDate = qd;
    localStorage.pricePerPack = ppp;
    localStorage.numCigarsInput = noc;

}

displayQuitDate();
displayLastCigarette();
displayCigaretteNotSmoked();
displayMoneySaved();

function displayQuitDate(){
    quitDateInfo.innerHTML = moment(localStorage.newQuiteDate).format('LLL');
}

function displayLastCigarette(){
    elapsed.innerHTML = moment(localStorage.newQuiteDate).fromNow();    
}
function displayCigaretteNotSmoked(){
    let cigarPerMinut = (parseInt(localStorage.numCigarsInput) / 24) / 60;
    let qd = moment(localStorage.newQuiteDate);
    let now = moment();
    let minutes = now.diff(qd,'minutes'); //razlika u minutama
    noCigarNumber.innerHTML = (cigarPerMinut * minutes).toFixed(0);
}

function displayMoneySaved(){
    let priceOfOneCigar = parseInt(localStorage.pricePerPack) / 20;
    let qd = moment(localStorage.newQuiteDate);
    let now = moment();
    let minutes = now.diff(qd,'minutes');
    let hourSaved = (priceOfOneCigar * parseInt(localStorage.numCigarsInput)) / 24;
    let minutSaved = hourSaved / 60;
    moneySaved.innerHTML = (minutSaved * minutes).toFixed(3);
}

function initApp(){
    if(localStorage.newQuiteDate){
        displayQuitDate();
        displayLastCigarette();
        displayCigaretteNotSmoked();
        displayMoneySaved();
    }

    let loop = setInterval(displayLastCigarette,10000);
    let loop1 = setInterval(displayCigaretteNotSmoked,1000)
    let loop2 = setInterval(displayMoneySaved,6000)
}