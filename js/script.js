window.addEventListener('DOMContentLoaded', () => {


    //Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

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

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function(event) {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2022-04-20';

    function  getTimeRemaining(endtime) {
        const t = Date.parse(endtime)- Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 *24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    };

    function getZero (num) {
        if (num >=0 && num <10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock (selector, endtime) {
        const timer = document.querySelector(selector);
        const days =timer.querySelector('#days');
        const hours =timer.querySelector('#hours');
        const minutes =timer.querySelector('#minutes');
        const seconds =timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000)

        updateClock()

        function updateClock () {
            const t = getTimeRemaining(endtime)

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadline)

//Modal


    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalCloseBtn = document.querySelector('[data-close]');




    modalTrigger.forEach(btn => {
        btn.addEventListener('click', modalOpen)})

    function modalOpen () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow='hidden'
        clearInterval(modalTimer)
    }

    const modalTimer = setInterval(modalOpen, 5000)

    function modalClose () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow=''
    }

    modalCloseBtn.addEventListener('click', modalClose)

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalClose()
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            modalClose()
        }
    })

    function showModalByScroll () {
        if (window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            removeEventListener('scroll', showModalByScroll)
        }
    }
    window.addEventListener('scroll', showModalByScroll)

    //Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH () {
            this.price = this.price * this.transfer;
        }
        render () {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                     <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element)
        }
    };

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих\n" +
        "овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной\n" +
        "ценой и высоким качеством!",
        9,
        '.menu .container'
    ).render();
});