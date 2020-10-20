class Momentum {
    constructor() {
        const _ = this;
        _.timeTag = document.querySelector('.time');
        _.dateTag = document.querySelector('.date');
        _.bgcTag = document.querySelector('.background');
        _.hour = new Date().getHours();
        _.bgc = [
            'night-01.jpg',
            'night-02.jpg',
            'night-03.jpg',
            'night-04.jpg',
            'night-05.jpg',
            'night-06.jpg',
            'morning-01.jpg',
            'morning-02.jpg',
            'morning-03.jpg',
            'morning-04.jpg',
            'morning-05.jpg',
            'morning-06.jpg',
            'day-01.jpg',
            'day-02.jpg',
            'day-03.jpg',
            'day-04.jpg',
            'day-05.jpg',
            'day-06.jpg',
            'evening-01.jpg',
            'evening-02.jpg',
            'evening-03.jpg',
            'evening-04.jpg',
            'evening-05.jpg',
            'evening-06.jpg'];
        _.nameInputTag = document.getElementById('name');

        _.init();

        document.getElementById('bgcList').addEventListener('click',function (e) {_.setNextBgc()});
        document.querySelector('.burger').addEventListener('click',function () {_.burgerClick()});
        document.getElementById('lang-btn-en').addEventListener('click',function (e) {_.changeLang('en')});
        document.getElementById('lang-btn-ru').addEventListener('click',function (e) {_.changeLang('ru')});
    }

    bgcCheck(){
        const _ = this;
        let hour = new Date().getHours();
        if(_.hour !== hour){
            _.hour = hour;
            _.setBgPicture(_.hour);
            _.setGreetings(_.hour)
        }
    }
    setGreetings(hour){
        const _ = this;

        let greetings = _.lang === 'en' ? ['Good night,','Good morning,','Good day,','Good evening,'] : ['Доброй ночи,','Доброе утро,','Добрый день,','Добрый вечер,'];
        let greetingArea = document.getElementById('greeting');
        if(hour >=0 && hour < 6) greetingArea.textContent = greetings[0];
        if(hour >=6 && hour < 12) greetingArea.textContent = greetings[1];
        if(hour >=12 && hour < 18) greetingArea.textContent = greetings[2];
        if(hour >=18 && hour <= 23) greetingArea.textContent = greetings[3];
    }
    setTexts(){
        const _ = this;

        let buttonText = ['Add task','Change background','Choose language:'];
        if(_.lang === 'ru') buttonText = ['Добавить задание','Сменить фон','Выберите язык:'];

        document.getElementById('add').textContent = buttonText[0];
        document.getElementById('bgcList').textContent = buttonText[1];
        document.querySelector('.lang span').textContent = buttonText[2];
    }
    setBgPicture(i){
        const _ = this;
        _.bgcTag.setAttribute('style',`background-image:url(assets/${_.bgc[i]})`);
    }

    setNextBgc(){
        const _ = this;
        let nextBgc = document.getElementById('bgcList');
        if(!nextBgc.hasAttribute('data-hour')) nextBgc.setAttribute('data-hour',_.hour + '');
        let nextHour = nextBgc.getAttribute('data-hour');
        nextHour = (nextHour * 1) + 1;
        if(nextHour === 24) nextHour = 0;
        nextBgc.setAttribute('data-hour',nextHour + '');
        _.setBgPicture(nextHour);
    }

    dateLengthCheck(str){
        if(str.length === 1) str = '0' + str;
        return str;
    }
    getTime(date){
        const _ = this;

        let hours = _.dateLengthCheck(date.getHours() + ''),
            minutes = _.dateLengthCheck(date.getMinutes() + ''),
            seconds = _.dateLengthCheck(date.getSeconds() + '');

        let time = hours + ':' + minutes + ':' + seconds;
        return time
    }
    getDate(date){
        const _ = this;

        let day = date.getDay(),
            monthDay = _.dateLengthCheck(date.getDate() + ''),
            month = _.dateLengthCheck(date.getMonth() + 1 + ''),
            year = _.dateLengthCheck(date.getFullYear() + '');

        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        if(_.lang === 'ru') days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
        day = days[day];

        let str = day + ', ' + monthDay + '.' + month + '.' + year;
        return str;
    }
    insertTime(){
        const _ = this;
        let date = new Date();
        _.timeTag.textContent = _.getTime(date);
        _.dateTag.textContent = _.getDate(date);
    }

    nameHandler(){
        const _ = this;

        if(!localStorage.getItem('momentum-name')) localStorage.setItem('momentum-name','[введите имя]');
        _.nameInputTag.textContent = localStorage.getItem('momentum-name');

        function enterName(){
            if(_.nameInputTag.textContent === '') _.nameInputTag.textContent = localStorage.getItem('momentum-name');
            else localStorage.setItem('momentum-name',_.nameInputTag.textContent);
        }

        _.nameInputTag.addEventListener('focus',function (e) {
            setTimeout(function () {_.nameInputTag.textContent = ''},10)});
        _.nameInputTag.addEventListener('focusout',function (e) {enterName()});
        _.nameInputTag.addEventListener('keydown',function (e) {
            if(e.code === 'Enter' || e.code === 'Tab'){
                e.preventDefault();
                enterName();
                _.nameInputTag.blur();
            }
        })

    }

    burgerClick(){
        let block = document.querySelector('.right-top');
        block.classList.toggle('right-top-active')
    }

    changeLang(lang){
        const _ = this;
        let date = new Date();
        let hour = date.getHours();
        let alternative = lang === 'en' ? 'ru' : 'en';
        if(!document.querySelector('.lang').classList.contains(lang)) {
            document.querySelector('.lang').classList.add(lang);
            document.querySelector('.lang').classList.remove(alternative);
            localStorage.setItem('momentum-lang',lang);
            _.lang = lang;
            _.setTexts();
            _.setGreetings(hour);
            _.getDate(date)
        }
    }
    chooseLang(){
        const _ = this;

        if(!localStorage.getItem('momentum-lang')) localStorage.setItem('momentum-lang','en');
        _.lang = localStorage.getItem('momentum-lang');
        document.querySelector('.lang').classList.add(_.lang);
    }

    init(){
        const _ = this;

        _.chooseLang();
        _.setGreetings(_.hour);
        _.setBgPicture(_.hour);
        _.setTexts();
        _.nameHandler();
        setInterval(function () {
            _.bgcCheck();
            _.insertTime();
        },1000);
    }
}

let momentum = new Momentum();