$(async () => {
    $('#notification-dropdown').on('shown.bs.dropdown', () => {
        $('#notification-dropdown').addClass('active')
    });

    $('#notification-dropdown').on('hidden.bs.dropdown', () => {
        $('#notification-dropdown').removeClass('active')
    });
})