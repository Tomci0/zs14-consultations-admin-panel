$(() => {
    console.log('All component loaded');
    const $sidebar = $('#sidebar');
    const $content = $('#content');
    const $hideMenuBtn = $('#hide-menu .btn');

    // Funkcja do przełączania bocznego paska
    const toggleSidebar = () => {
        if ($sidebar.hasClass('hide')) {
            $sidebar.animate({
                width: '17rem'
            }, 500, () => {
                $sidebar.removeClass('hide').addClass('show').removeClass('d-none');
            });
        } else {
            $sidebar.animate({
                width: '0'
            }, 500, () => {
                $sidebar.addClass('hide').removeClass('show').addClass('d-none');
            });
        }
    };

    // Obsługa kliknięcia przycisku ukrywania menu
    $hideMenuBtn.on('click', () => {
        const isMobile = $(window).width() < 768;

        if (isMobile) {
            toggleSidebar();
        }
    });
});

const isElementLoaded = async selector => {
    while ( document.querySelector(selector) === null) {
      await new Promise( resolve =>  requestAnimationFrame(resolve) )
    }
    return document.querySelector(selector);
};

isElementLoaded('#sidebar .navigation').then((el) => {
    $(el).removeClass('active');

    // GET URL

    const url = window.location.pathname;
    const urlArray = url.split('/');
    const urlPage = urlArray[urlArray.length - 1];
    
    $('.navigation a.item[href="/' + (urlPage==''?'index.html':urlPage) + '"]').addClass('active');
});