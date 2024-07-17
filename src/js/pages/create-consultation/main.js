import airDatepicker from 'https://esm.run/air-datepicker';

$(() => {
    new airDatepicker('#consultation-date', {
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
}); 