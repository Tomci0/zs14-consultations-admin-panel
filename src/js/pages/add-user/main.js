$(() => {

    let currentStep = 0;

    const $addUserBtn = $('#add-user-btn');
    const $usersList = $('#users');

    function addUser() {
        const $newUser = $(`
            <div class="user">
                <a class="remove-btn link">
                    <span class="icon iconify" data-icon="mdi:close"></span>
                </a>
                <div class="item">
                    <label for="user-firstname" class="form-label">Nazwisko Ucznia</label>
                    <input type="text" class="form-control" id="user-surname" aria-describedby="emailHelp">
                </div>
                <div class="item">
                    <label for="user-surname" class="form-label">Imie Ucznia</label>
                    <input type="text" class="form-control" id="user-firstname" aria-describedby="emailHelp">
                </div>
            </div>
        `)
        
        $('#users > a#add-user-btn').before($newUser);

        // auto scroll to the bottom of the .carousel-inner

        const $carouselInner = $('.carousel-inner');
        const carouselInnerHeight = $carouselInner.height();
        const usersListHeight = $usersList.height();

        console.log(usersListHeight, carouselInnerHeight);

        if (usersListHeight > carouselInnerHeight) {
            // $carouselInner srcoll bottom

            $carouselInner.animate({
                scrollTop: usersListHeight
            }, 1000);
        }
    }

    $addUserBtn.on('click', addUser);

    $($usersList).on('click', '.remove-btn', function() {
        $(this).closest('.user').remove();
    });

    const $nextBtn = $('#next-btn');
    const $prevBtn = $('#prev-btn');
    const $createUsersBtn = $('#create-users-btn');
    const $finishBtn = $('#finish-btn');
    const $carousel = $('#add-user-form-carousel');
    const $newMembers = $('#new-members');

    $nextBtn.on('click', function() {

        if (currentStep === 0) {
            if (!checkInputs()) {
                return;
            }

            currentStep++;
            $carousel.carousel('next');

            $nextBtn.addClass('d-none');
            $prevBtn.removeClass('d-none');
            $createUsersBtn.removeClass('d-none');
            $newMembers.text($('#users .user').length);
        }
    });

    $createUsersBtn.on('click', async function() {

        $createUsersBtn.attr('disabled', true);
        $prevBtn.attr('disabled', true);

        $createUsersBtn.html('<span class="spinner-border spinner-border-sm ml-1" role="status" aria-hidden="true"></span> <span class="title">Tworzenie...</span>');

        const users = [];

        $('#users .user').each(function() {
            const $user = $(this);
            const firstName = $user.find('#user-firstname').val();
            const lastName = $user.find('#user-surname').val();

            users.push({
                firstName,
                lastName
            });
        });

        // sort users by last name

        users.sort((a, b) => {
            if (a.lastName < b.lastName) {
                return -1;
            } else if (a.lastName > b.lastName) {
                return 1;
            } else {
                return 0;
            }
        });

        await createUsersFromArray(users);


        $carousel.carousel('next');
        $createUsersBtn.addClass('d-none');
        $prevBtn.addClass('d-none');
        $finishBtn.removeClass('d-none');
    });

    function checkInputs() {
        const $inputs = $('#add-user-form-carousel input');

        for (let i = 0; i < $inputs.length; i++) {
            const $input = $($inputs[i]);

            if ($input.val() === '') {
                $input.addClass('is-invalid');
            } else {
                $input.removeClass('is-invalid');
            }
        }

        if ($('#add-user-form-carousel input.is-invalid').length > 0) {
            return false;
        } else {
            return true;
        }
    }

    $prevBtn.on('click', function() {
        if (currentStep === 1) {
            currentStep--;
            $carousel.carousel('prev');

            $nextBtn.removeClass('d-none');
            $prevBtn.addClass('d-none');
            $createUsersBtn.addClass('d-none');
        }
    });




    const $form = $('#add-user');

    $form.on('submit', function(e) {
        e.preventDefault();
    });

    async function createUsersFromArray(users) {
        // TODO: CONNECT TO API

        new Promise((resolve, reject) => {

            // HERE WE SHOULD CONNECT TO API

            setTimeout(() => {
                resolve(users);
            }, 2000);
        }).then((users) => {
            console.log('Users created:', users);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
});