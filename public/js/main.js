// DOM elements
const mainContainer = document.querySelector('.main-container');
const daysContainer = document.getElementById('days');
const datesContainer = document.getElementById('dates');
const navBar = document.querySelector('.nav-bar.front');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnsX = document.querySelectorAll('.btn.x');
const headerDOM = document.querySelector('.header');
const headerH1 = document.querySelector('.header h1');
const headerH2 = document.querySelector('.header h2');
const headerLogo = document.querySelector('.header .logo');
const headerIcon = document.querySelector('.header .icon');
const contentDays = document.getElementById('days');
const contentDates = document.getElementById('dates');
const  resultDaysContent = document.querySelector('.result-days-content');
const  resultDatesContent = document.querySelector('.result-dates-content');
// helper | flag vars
let flagMenuOpen = false;
//  event listeners for navigation
btnLeft.addEventListener('click', () => (!flagMenuOpen) ? handleDays() : handleClose());
btnRight.addEventListener('click', () => (!flagMenuOpen) ? handleDate() : handleClose());
for (btn of btnsX) {
    btn.addEventListener('click' , handleClose);
}

/*
* @description closes UI to get back to main screen
*/
function handleClose() {
    navBar.style.transform = "translateX(0)";
    mainContainer.style.backgroundColor = 'var(--bg-main-white)';
    daysContainer.style.transform = 'translateY(500px)';
    datesContainer.style.transform = 'translateY(500px)';
    handleHeader('close')
    contentDates.classList.add('hide');
    contentDays.classList.add('hide');
    flagMenuOpen = false;
}

/*
* @description shows UI for Days screen
*/
function handleDays() {
    navBar.style.transform = "translateX(60%)";
    mainContainer.style.backgroundColor = 'var(--bg-main-yellow)';
    daysContainer.style.transform = 'translateY(0px)';
    datesContainer.style.transform = 'translateY(500px)';
    contentDays.classList.remove('hide');
    flagMenuOpen = true;
    initDays();
    handleHeader('days');
}

/*
* @description shows UI for Dates screen
*/
function handleDate() {
    navBar.style.transform = "translateX(-60%)";
    mainContainer.style.backgroundColor = 'var(--bg-main-yellow)';
    datesContainer.style.transform = 'translateY(0)';
    daysContainer.style.transform = 'translateY(500px)';
    contentDates.classList.remove('hide');
    flagMenuOpen = true;
    initDates();
    handleHeader('dates');
}

/*
* @description change and show/hide UI text accordingly to the actual screen 
* @param {string} category which Screen to show 
*/
function handleHeader(category){
    headerDOM.classList.remove('hide');
    if (category === 'days') {
        headerH1.textContent = 'Cantidad de Días';
        headerH2.textContent = '¿En qué fecha termina la licencia?';
        headerIcon.querySelector('img').src = 'images/icon_days.svg';
        headerH1.classList.toggle('hide');
        headerH2.classList.toggle('hide');
        
        headerIcon.classList.remove('header-icon-popdown');
        headerIcon.offsetWidth;
        headerIcon.classList.add('header-icon-popup');
        headerLogo.classList.remove('header-logo-popdown');
        headerLogo.offsetWidth;
        headerLogo.classList.add('header-logo-popdup');
    }
    if (category === 'dates') {
        headerH1.textContent = 'Rango de Fechas';
        headerH2.textContent = '¿Cuántos días hay entre dos fechas?';
        headerH1.classList.toggle('hide');
        headerH2.classList.toggle('hide');
        headerIcon.querySelector('img').src = 'images/icon_dates.svg';
        
        headerIcon.classList.remove('header-icon-popdown');
        headerIcon.offsetWidth;
        headerIcon.classList.add('header-icon-popup');
        headerLogo.classList.remove('header-logo-popdown');
        headerLogo.offsetWidth;
        headerLogo.classList.add('header-logo-popdup');
    }
    if (category === 'close') {
        headerH1.classList.toggle('hide');
        headerH2.classList.toggle('hide');
        headerIcon.classList.remove('header-icon-popdup');
        headerLogo.classList.remove('header-logo-popdup');
        headerIcon.offsetWidth;
        headerLogo.offsetWidth;
        headerIcon.classList.add('header-icon-popdown');
        headerLogo.classList.add('header-logo-popdown');
        resultDaysContent.classList.add('hide');
        resultDatesContent.classList.add('hide');
    }
}

/*
* @description initializes Days screen elements: resets dates and add event listeners
*/
function initDays() {
    const startDateDOM = document.getElementById('start-lic-days');
    const amountDaysDOM = document.getElementById('amount-days');
    const [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
    startDateDOM.value = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`; //valueshould go formatted YYYY-MM-DD
    amountDaysDOM.value = 0;
    startDateDOM.addEventListener('change', handleDaysSolution);
    amountDaysDOM.addEventListener('change', handleDaysSolution);
}

/*
* @description initializes Dates screen elements: resets dates and add event listeners
*/
function initDates() {
    const startDateDOM = document.getElementById('start-lic-dates');
    const endDateDOM = document.getElementById('end-lic-dates');
    const amountDaysDOM = document.getElementById('result-dates');
    amountDaysDOM.value = 0;
    const [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
    startDateDOM.value = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`; //values should go formatted YYYY-MM-DD
    endDateDOM.value = `${year}-${month.padStart(2,'0')}-${date.padStart(2,'0')}`;
    startDateDOM.addEventListener('change' , handleDatesSolution);
    endDateDOM.addEventListener('change' , handleDatesSolution);
}

/*
 * @description calculates final date
 */
function handleDaysSolution(){
    let amountDays = parseInt(document.getElementById('amount-days').value);
    let inputDate = document.getElementById('start-lic-days').value;
    const [year, month, date] = inputDate.split("-");
    checkEasterEgg(month, date);
    if (amountDays < 1) return;
    let resultDate = new Date(Date.UTC(year , month , date));

    resultDate.setUTCDate(resultDate.getUTCDate() + amountDays);

    displayDaysResult(resultDate);
}

/*
 * @description calculates amount of days between dates
 */
function handleDatesSolution(){
    const startDate = document.getElementById('start-lic-dates').value;
    let [year, month, date] = startDate.split("-");
    checkEasterEgg(month, date);
    const dateA = new Date(Date.UTC(year , month , date));
    const endDate = document.getElementById('end-lic-dates').value;
    [year, month, date] = endDate.split("-");
    checkEasterEgg(month, date);
    const dateB = new Date(Date.UTC(year , month , date));
    const resultDays = (dateB.getTime() - dateA.getTime()) / (1000 * 3600 * 24); //millis to days

    displayDatesResult(resultDays);
}

/*
 * @description shows result adapting UI to the screen category
 * @param {object} resultDate Date result of calculation
 */
function displayDaysResult(resultDate) {
    const resultDaysDOM = document.querySelector('.result-days-content');
    const result = `${resultDate.getUTCDate()} / ${resultDate.getUTCMonth()} / ${resultDate.getUTCFullYear()}`;
    document.getElementById('result-days').textContent = result;
    resultDaysDOM.classList.remove('hide');
}

/*
 * @description shows result adapting UI to the screen category
 * @param {number} resultDays result of calculation
 */
function displayDatesResult(resultDays) {
    const resultDatesDOM = document.querySelector('.result-dates-content');
    document.getElementById('result-dates').textContent = 
    (resultDays) ? Math.abs(parseInt(resultDays)) : 'error';
    resultDatesDOM.classList.remove('hide');
}

/**
 * @description shhh
 */
function checkEasterEgg(month, date) {
    if ((month === '02') && (date === '19')) {
        const easterEggContainerDOM = document.querySelector('.easteregg');
        easterEggContainerDOM.classList.remove('hide');
        const easterEggImageDOM = document.querySelector('.easteregg img');
        easterEggImageDOM.classList.remove('anim-easter-egg');
        easterEggImageDOM.offsetWidth;
        easterEggImageDOM.classList.add('anim-easter-egg');
        setTimeout(()=>easterEggContainerDOM.classList.add('hide'),4000);
    }
}