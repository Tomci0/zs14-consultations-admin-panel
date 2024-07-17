/*

    ON PAGE LOAD

*/

$(() => {
    setCalendar();
})


/*


    FUNCTIONS


*/

function getDaysTable(year, month) {
    var daysTable = [];
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);

    for (var i = 0; i < 41; i++) {
        daysTable.push(false);
    }

    var firstDayIndex = firstDay.getDay() - 1;
    var lastDayIndex = lastDay.getDay() - 1;

    if (firstDayIndex == -1) {
        firstDayIndex = 6;
    }

    if (lastDayIndex == -1) {
        lastDayIndex = 6;
    }

    for (var i = 0; i < lastDay.getDate(); i++) {
        daysTable[firstDayIndex + i] = i + 1;
    }

    let weeks = []
    for (var i = 0; i < daysTable.length; i++) {
        if (!weeks[Math.floor(i / 7)]) {
            if (daysTable[i] == false && i > 7) continue;
            weeks[Math.floor(i / 7)] = [];
        }

        weeks[Math.floor(i / 7)].push(daysTable[i]);
    }


    return weeks;
}

const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Pażdziernik',
    'Listopad',
    'Grudzień'
]

let currentData = {}

function setCalendar(year, month) {
    if (year == undefined) { 
        year = new Date().getFullYear();
    }  

    if (month == undefined) {
        month = new Date().getMonth();
    }

    currentData.year = year;
    currentData.month = month;
    $('#calendar').attr('data-month', month);
    $('#calendar').attr('data-year', year);

    $('.month-selection .month').text(months[month]);
    $('.month-selection .year').text(year);

    const currentCalendarArray = getDaysTable(year, month);
    $('#calendar tbody').html('');
    let numberOfElements = 0;
    for (var i = 0; i < currentCalendarArray.length; i++) {
        numberOfElements++;
        var week = currentCalendarArray[i];
        var weekRow = document.createElement('tr');
    
        for (var j = 0; j < week.length; j++) {
            var day = week[j];
            var dayCell = document.createElement('td');
            if (day) {
                const rndColor = randomColor();
                dayCell.setAttribute('date-day', day);
                dayCell.innerHTML = `
                <div class="day-month">
                    <div class="day ${year == new Date().getFullYear() & month == new Date().getMonth() & day == new Date().getDate()?'active':''}">
                        <span>${day}</span>
                    </div>
                </div>
                <div class="plate-list">
                    <div class="plate ${rndColor}" data-bs-toggle="modal" data-bs-target="#consultation-details-modal">
                        <span class="time">12:12-15:15</span>
                        <span class="value">
                            <div class="item">
                                <span class="iconify" data-icon="mdi:book" data-inline="false"></span>
                                <span class="teacher-name">J. Polski</span>
                            </div>
                            <div class="item">
                                <span class="iconify" data-icon="mdi:people" data-inline="false"></span>
                                <span class="teacher-name">25</span>
                            </div>
                        </span>
                    </div>
                `;
            } else {
                dayCell.innerHTML = ''
            }
            
            weekRow.appendChild(dayCell);
        }

       $('#calendar tbody').append(weekRow) 

       $('.plate[data-bs-toggle="collapse"]').each((i, e) => {
            const target = $(e).attr('href')
            $(target).on('shown.bs.collapse', () => {
                $(e).addClass('collapsed');
            });

            $(target).on('hidden.bs.collapse', () => {
                $(e).removeClass('collapsed')
            })
        });
    }

    refreshCalendarContent();
}

function randomColor() {
    const options = [
        'green',
        'yellow',
        'red',
        'blue',
        'purple',
        'turquoise',
        'orange',
        'pink',
        'brown',
    ]

    return options[Math.floor(Math.random() * options.length)];
}

/*

    CALENDAR ITEM

    <div class="day-month">
        <div class="day ${year == new Date().getFullYear() & month == new Date().getMonth() & day == new Date().getDate()?'active':''}">
            <span>${day}</span>
        </div>
    </div>
    <div class="plate-list">
        <div class="plate ${randomColor()}">
            <span class="time">12:12-15:15</span>
            <span class="value">
                <div class="item">
                    <span class="iconify" data-icon="mdi:person" data-inline="false"></span>
                    <span class="teacher-name">Jan Kowalski</span>
                </div>
                <div class="item">
                    <span class="iconify" data-icon="mdi:book" data-inline="false"></span>
                    <span class="teacher-name">J. Polski</span>
                </div>
            </span>
        </div>
    </div>


*/