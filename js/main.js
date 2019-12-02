/* MODALS */

var modalAppointment = document.querySelector('.modal-appointment'),
    btOpenForm = document.querySelector('#open-form'),
    closeModalAppointment = document.querySelector('.form-appointment-close'),
    formModalAppointment = document.querySelector('.form-appointment'),
    overlay = document.querySelector('.overlay');

var nameAppointmentInput = document.querySelector('.modal-appointment [name=name]'),
    emailAppointmentInput = document.querySelector('.modal-appointment [name=email]'),
    textAppointmentInput = document.querySelector('.modal-appointment [name=text]');

var nameStorage = localStorage.getItem('name'),
    emailStorage = localStorage.getItem('email');

var forms = document.querySelectorAll('.modal');

//Объект с методами для открытия/закрытия модальных окон
//on - открывает
//off - закрывает
let commutator = {
    on: function () {
        modalAppointment.classList.toggle('show-form');
        modalAppointment.classList.add('animation-appointment-form'); //Анимация
        overlay.classList.add('show-overlay');

        setTimeout(function () { //Удалим анимацию, чтоб не мешала другим анимациям
            modalAppointment.classList.remove('animation-appointment-form');
        }, 2000);
        // при повторном открытии УДАЛЯЮТСЯ ОБА КЛАССА! - 
        //Проблема решается перезагрузкой страницы после закрытия
    },
    off: function () {
        modalAppointment.classList.add('close-form-animation');

        setInterval(function () {
            modalAppointment.classList.remove('show-form');
            modalAppointment.classList.remove('close-form-animation');
            location.reload();
        }, 2000);
    }
};

btOpenForm.addEventListener('click', function (event) {
    event.preventDefault();
    commutator.on();
    
    if (nameStorage) {
        nameAppointmentInput.value = nameStorage;
        emailAppointmentInput.focus();
    }
    if (nameStorage) {
        emailAppointmentInput.value = emailStorage;
        textAppointmentInput.focus();
    }
});

formModalAppointment.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!nameAppointmentInput.value || !emailAppointmentInput.value || !textAppointmentInput.value) {
        modalAppointment.classList.add('modal-error');
        setTimeout(() => //Удалим анимацию, чтоб не мешала другим анимациям
            modalAppointment.classList.remove('modal-error'), 2000);
    } else {
        localStorage.setItem('name', nameAppointmentInput.value);
        localStorage.setItem('email', emailAppointmentInput.value);

        textAppointmentInput.value = '';
    }
});

closeModalAppointment.addEventListener('click', function (event) {
    event.preventDefault();
    commutator.off();
});
overlay.addEventListener('click', function (event) {
    event.preventDefault();
    commutator.off();
});

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        event.preventDefault();
        for (let i = 0; forms.length > i; i++) {
            forms[i].classList.remove('show-form');
        }
    }
});

/* SLIDERS */
try{
    var slideIndex = 1,
        slides = document.querySelectorAll('.slider'),
        dotsWrap = document.querySelector('.slider-indicators'),
        dots = document.querySelectorAll('.slider-indicator');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length)
            slideIndex = 1;
        if (n < 1)
            slideIndex = slides.length;

        slides.forEach((item) => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'flex';
        dots[slideIndex - 1].click();
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlides(n) {
        showSlides(slideIndex = n);
    }

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('slider-indicator') && event.target == dots[i - 1]) {
                currentSlides(i);
            }
        }
    });


    setInterval(() => plusSlides(1), 8000);

} catch { 
    console.log('Ошибка или отсуствие слайдеров'); 
}
