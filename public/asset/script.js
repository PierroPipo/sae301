$(document).ready(function () {
    $(".calendar-day div").hover(function () {
        // Récupérez le texte personnalisé à partir de l'attribut data-text
        var customText = $(this).data("text");

        // Mettez à jour le texte de l'élément .notes avec le texte personnalisé
        $(".notes h2").text(customText);
    }, function () {
        // Réinitialisez le texte de l'élément .notes après le survol
        $(".notes h2").text("Survoler les devoirs pour faire apparaître la note.");
    });
});


const isLeapYear = (year) => {
return(
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
);
};
const getFebDays = (year) => {
return isLeapYear(year) ? 29 : 28;
};
let calendar = document.querySelector('.calendar');
const month_names = [
'Janvier',
'Fevrier',
'Mars',
'Avril',
'Mai',
'Juin',
'Juillet',
'Août',
'Septembre',
'Octobre',
'Novembre',
'Décembre',

];
let month_picker = document.querySelector('#month-picker');
const dayTextFormate = document.querySelector('.day-text-formate');
const timeFormate = document.querySelector('.time-formate');
const dateFormate = document.querySelector('.date-formate');

month_picker.onclick = () => {
month_list.classList.remove('hideonce');
month_list.classList.remove('hide');
month_list.classList.add('show');
dayTextFormate.classList.remove('showtime');
dayTextFormate.classList.add('hidetime');
timeFormate.classList.remove('showtime');
timeFormate.classList.add('hidetime');
dateFormate.classList.remove('showtime');
dateFormate.classList.add('hidetime');
};

let savedData = JSON.parse(localStorage.getItem('calendarData')) || {};
data = JSON.parse(localStorage.getItem('calendarData')) || {};
const generateCalendar = (month,year) => {
let calendar_days = document.querySelector('.calendar-days');
calendar_days.innerHTML = '';
let calendar_header_year = document.querySelector('#year');
let days_of_month = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
let currentDate = new Date();
month_picker.innerHTML = month_names[month];
calendar_header_year.innerHTML = year;
let first_day = new Date(year, month);

for(let i=0; i<=days_of_month[month] + first_day.getDay() - 1; i++){
    let day = document.createElement('div');
    if(i >= first_day.getDay()){
        let dayNumber = i - first_day.getDay() + 1;
        day.innerHTML = dayNumber;

        if (savedData[`${year}-${month + 1}-${i - first_day.getDay() + 1}`]) {
            day.classList.add('data-saved');
        }

        if (dayNumber === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
            day.classList.add('current-date');
        }

        day.addEventListener('click', () => {
            showPopup(dayNumber);
        });
    }
    calendar_days.appendChild(day);
}

};

savedData = JSON.parse(localStorage.getItem('calendarData')) || {};

let currentYear, currentMonth, currentDay;
let currentDate = new Date();
currentMonth = {value : currentDate.getMonth()};


const form = document.getElementById('popupForm');

// Update the form submit event to save data to localStorage
form.addEventListener('submit', function (event) {
event.preventDefault();

const subject = document.getElementById('subject').value;
const homework = document.getElementById('homework').value;
const description = document.getElementById('description').value;

if (validateFormData(subject, homework, description)) {
    // Sauvegarde des données si elles sont valides
    const key = `${currentYear}-${currentMonth.value + 1}-${currentDay}`;
    savedData[key] = { subject, homework, description };
    localStorage.setItem('calendarData', JSON.stringify(savedData));

    showConfirmationMessage();
    closePopup();  // Ferme le pop-up
} else {
    alert("Veuillez remplir tous les champs.");
}
});

// Update the existing showPopup function if it's declared elsewhere
function showPopup(dayNumber) {
const modalContainer = document.getElementById('modalContainer');
modalContainer.style.display = 'flex';

// Load saved data for the clicked day
const savedDayData = savedData[`${currentYear.value}-${currentMonth.value + 1}-${dayNumber}`] || {};
document.getElementById('subject').value = savedDayData.subject || '';
document.getElementById('homework').value = savedDayData.homework || '';
document.getElementById('description').value = savedDayData.description || '';
}

function validateFormData(subject, homework, description) {
// Ici, vous pouvez ajouter des règles de validation spécifiques
return subject.trim() !== '' && homework.trim() !== '' && description.trim() !== '';
}

function showConfirmationMessage() {
// Vous pouvez personnaliser cette fonction pour mieux s'intégrer à votre interface
alert("Données sauvegardées avec succès !");
}

// Update the existing closePopup function
const closePopup = () => {
const modalContainer = document.getElementById('modalContainer');
modalContainer.style.display = 'none';
clearFormData();  // Nettoyez les champs du formulaire
};

function clearFormData() {
document.getElementById('subject').value = '';
document.getElementById('homework').value = '';
document.getElementById('description').value = '';
}

let month_list = calendar.querySelector('.month-list');
month_names.forEach((e, index) => {
let month = document.createElement('div');
month.innerHTML = `<div>${e}</div>`;
month_list.append(month);
month.onclick = () => {
    currentMonth.value = index;
    generateCalendar(currentMonth.value, currentYear.value);
    month_list.classList.replace('show', 'hide');
    dayTextFormate.classList.remove('hidetime');
    dayTextFormate.classList.add('showtime');
    timeFormate.classList.remove('hidetime');
    timeFormate.classList.add('showtime');
    dateFormate.classList.remove('hidetime');
    dateFormate.classList.add('showtime');
};
});

(function () {
month_list.classList.add('hideonce');
})();
document.querySelector('#pre-year').onclick = () => {
--currentYear.value;
generateCalendar(currentMonth.value, currentYear.value);
};
document.querySelector('#next-year').onclick = () => {
++currentYear.value;
generateCalendar(currentMonth.value, currentYear.value);
};

currentDate = new Date();
currentYear = {value : currentDate.getFullYear()};
generateCalendar(currentMonth.value, currentYear.value);

const todayShowTime = document.querySelector('.time-formate');
const todayShowDate = document.querySelector('.date-formate');

const currshowDate = new Date();
const showCurrentDateOption = {
year : 'numeric',
month : 'long',
day : 'numeric',
weekday : 'long',
};
const currentDateFormate = new Intl.DateTimeFormat(
'fr-FR',
showCurrentDateOption
).format(currshowDate);
todayShowDate.textContent = currentDateFormate;
setInterval(() => {
const timer = new Date();
const option = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};
const formateTimer = new Intl.DateTimeFormat('fr-FR', option).format(timer);
let time = `${`${timer.getHours()}`.padStart(
    2,
    '0'
)}:${`${timer.getMinutes()}`.padStart(
    2,
    '0'
)}:${`${timer.getSeconds()}`.padStart(2, '0')}`;
todayShowTime.textContent = formateTimer;
}, 1000);

document.querySelector('.calendar').addEventListener('mouseover', function(event) {
if (event.target.classList.contains('data-saved')) {
    let date = event.target.dataset.date; // Assurez-vous que chaque jour a un attribut 'data-date'
    let savedDataForDate = savedData[date];
    if (savedDataForDate) {
        // Mettez à jour le contenu de la div .notes avec les données sauvegardées
        document.querySelector('.notes').innerText = savedDataForDate;
    }
}
});

function toggleHamburgerMenu() {
var nav = document.querySelector('nav');
var button = document.querySelector('.hamburger-menu');



if (nav.style.display === "block") {
    nav.style.display = "none";
    button.classList.remove('active');
} else {
    nav.style.display = "block";
    nav.style.top = "80px";
    button.classList.add('active');
}
}