 'use strict';
window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParrent = document.querySelector('.tabheader__items'),
          menuField = document.querySelector('.menu__field');



    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabsParrent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }
    });


    const deadline = '2024-06-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    const modalBtn = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalShow = document.querySelector('.modal-show'),
          modalClose = document.querySelectorAll('[data-close]');


    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';

    }

    function closeModal() {

        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';

    }
    
    modalBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            openModal();
        });
    })

    modalClose.forEach(item => {
        item.addEventListener('click', (e) => {
            closeModal();
        });
    });

    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });
    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);


    let container = document.createElement('div');
    container.classList.add('container');


    class Card {
        constructor(img, title, description, price, attribute) {
            this.img = img;
            this.title = title;
            this.description = description;
            this.price = price;
            this.attribute = attribute;
            this.tranfer = 17;
            this.changeToMDL();
        }


        changeToMDL() {
            this.price = this.price * this.tranfer;
        }

        createItem() {
            let divItem = document.createElement('div'); 
                    divItem.classList.add('menu__item');
                        menuField.prepend(container);
                        divItem.innerHTML = `
                                <img src=${this.img} alt=${this.attribute}>
                                    <h3 class="menu__item-subtitle">${this.title}</h3>
                                        <div class="menu__item-descr">${this.description}</div>
                                            <div class="menu__item-divider"></div>
                                        <div class="menu__item-price">
                                        <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> Лей/день</div>
                                </div>
                `;
            container.append(divItem);
        }

    }

    const menuCardOne = new Card('img/tabs/vegy.jpg', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 13, 'vegy');

    menuCardOne.createItem();

    const menuCardSecond = new Card('img/tabs/elite.jpg', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 22, 'elite');

    menuCardSecond.createItem();

    const menuCardThree = new Card('img/tabs/post.jpg', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ', 33, 'post');

    menuCardThree.createItem();

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        succses: 'Спасибо, скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;            
            `;
            form.append(statusMessage);


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.succses);
                    form.reset();
                        statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
         });
    }
    
    function showThanksModal(message) {

        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>       
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
        }, 4000)


    }
    
});