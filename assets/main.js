class Momentum {
    constructor() {
        const _ = this;
        _.timeTag = document.querySelector('.time');
        _.dateTag = document.querySelector('.date');
        _.bgcTag = document.querySelector('.background');
        _.hour = new Date().getHours();
        _.bgcMorning = ['morning-01.jpg','morning-02.jpg','morning-03.jpg','morning-04.jpg','morning-05.jpg','morning-06.jpg'];
        _.bgcDay = ['day-01.jpg','day-02.jpg','day-03.jpg','day-04.jpg','day-05.jpg','day-06.jpg'];
        _.bgcEvening = ['evening-01.jpg','evening-02.jpg','evening-03.jpg','evening-04.jpg','evening-05.jpg','evening-06.jpg'];
        _.bgcNight = ['night-01.jpg','night-02.jpg','night-03.jpg','night-04.jpg','night-05.jpg','night-06.jpg'];
        _.nameInputTag = document.getElementById('name');
        _.lang = 'eng';
        _.init();
    }

    bgcLoad(){
        const _ = this;

        let date = new Date();

        let pic = [],
            hour = date.getHours(),
            i = hour;

        if(hour >= 0 && hour < 6) {
            pic = _.bgcNight;
        } else if(hour >= 6 && hour < 12) {
            pic = _.bgcMorning;
            i = i - 6;
        } else if(hour >= 12 && hour < 18) {
            pic = _.bgcDay;
            i = i - 12
        } else {
            pic = _.bgcEvening;
            i = i - 18;
        }

        _.bgcSetPicture(pic,i);

        if(hour !== _.hour){
            _.hour = hour;
            i === 6 ? i = 0 : i++;
            _.bgcSetPicture(pic,i)
        }
    }
    bgcSetPicture(pic,i){
        const _ = this;
        let divs = _.bgcTag.querySelectorAll('div');
        divs[0].setAttribute('style',`background-image:url(assets/${pic[i]})`);
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

        let time = hours + '.' + minutes + '.' + seconds;
        return time
    }
    getDate(date){
        const _ = this;

        let day = date.getDay(),
            monthDay = _.dateLengthCheck(date.getDate() + ''),
            month = _.dateLengthCheck(date.getMonth() + 1 + ''),
            year = _.dateLengthCheck(date.getFullYear() + '');

        let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        _.lang === 'ru' ? days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'] : '';
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

        if(localStorage.getItem('name') === '') localStorage.setItem('name','[введите имя]');
        _.nameInputTag.textContent = localStorage.getItem('name');

        _.nameInputTag.addEventListener('focus',function (e) {
            setTimeout(function () {
                _.nameInputTag.textContent = '';
            },10);
        });
        _.nameInputTag.addEventListener('focusout',function (e) {
            if(_.nameInputTag.textContent === '') _.nameInputTag.textContent = localStorage.getItem('name');
            else localStorage.setItem('name',_.nameInputTag.textContent);
        });

    }


    init(){
        const _ = this;
        _.bgcLoad();
        setInterval(function () {_.insertTime()},1000);

        _.nameHandler();
    }
}

let momentum = new Momentum();