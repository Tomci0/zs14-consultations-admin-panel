import airDatepicker from 'https://esm.run/air-datepicker';

$(async () => {
    new airDatepicker('#consultation-date', {
        minDate: new Date(),
        locale:  {
            days: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
            daysShort: ['Nie', 'Pon', 'Wto', 'Śro', 'Czw', 'Pią', 'Sob'],
            daysMin: ['Nd', 'Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So'],
            months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            monthsShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
            today: 'Dzisiaj',
            clear: 'Wyczyść',
            dateFormat: 'dd.MM.yyyy',
            timeFormat: 'hh:mm:aa',
            firstDay: 1
        },
        selectedDates: [new Date()],
        
    });

    const markdownConverter = new showdown.Converter();

    $('#consultation-desc').on('keyup', () => {
        const val = $('#consultation-desc').val();
        $('#preview').html(markdownConverter.makeHtml(val))
    });


    const $lastSignFrom = $('#last-sign-form');
    

    $('#consultation-last-sign-checkbox').on('change', function() {
        console.log('change');

        if ($(this).prop('checked')) {
            console.log('checked');
            $lastSignFrom.removeClass('d-none');
        } else {
            console.log('unchecked');
            $lastSignFrom.addClass('d-none');
        }
    });


    /*
    *
    *   BUILDINGS AND ROOMS SELECT
    * 
    */

    const $buildingSelect = $('#consultation-building');
    const $roomSelect = $('#consultation-classroom');

    const buildings = await fetch('/data/classrooms.json').then(res => res.json());

    buildings.forEach((building, index) => {
        $buildingSelect.append(`<option value="${index}">${building.name}</option>`);
    });

    $buildingSelect.on('change', function() {
        const buildingIndex = $(this).val();

        if (buildingIndex === 'none') {
            $roomSelect.html('<option value="none" selected>Wybierz sale</option>');
            $roomSelect.attr('disabled', true);
            return;
        } else {
            $roomSelect.attr('disabled', false);
        }

        const building = buildings[buildingIndex];

        $roomSelect.html('<option value="none" selected>Wybierz sale</option>');

        building.classrooms.forEach((room, index) => {
            $roomSelect.append(`<option value="${index}">${room}</option>`);
        });
    });
});