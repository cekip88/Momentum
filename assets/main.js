class Momentum {
    path;
    constructor() {
        const _ = this;
        _.timeTag = document.querySelector('.time');
        _.dateTag = document.querySelector('.date');
        _.bgcTag = document.querySelector('.background');
        _.hour = new Date().getHours();
        _.bgc = [
            'night-01.jpg', 'night-02.jpg', 'night-03.jpg', 'night-04.jpg', 'night-05.jpg', 'night-06.jpg',
            'morning-01.jpg', 'morning-02.jpg', 'morning-03.jpg', 'morning-04.jpg', 'morning-05.jpg', 'morning-06.jpg',
            'day-01.jpg', 'day-02.jpg', 'day-03.jpg', 'day-04.jpg', 'day-05.jpg', 'day-06.jpg',
            'evening-01.jpg', 'evening-02.jpg', 'evening-03.jpg', 'evening-04.jpg', 'evening-05.jpg', 'evening-06.jpg'];
        _.nameInputTag = document.getElementById('name');

        _.init();

        document.getElementById('bgcList').addEventListener('click',function (e) {_.setNextBgc()});
        document.getElementById('add').addEventListener('click',function (e) {
            let btn = e.target;
            _.addTask(btn)
        });


    }

    getTasks(){
        let tasks = localStorage.getItem('momentum-tasks');
        if(!tasks) return null;
        tasks = JSON.parse(tasks);
        return tasks
    }
    saveTasks(tasks){
        tasks = JSON.stringify(tasks);
        localStorage.setItem('momentum-tasks',tasks)
    }
    showTasks(){
        let tasks = this.getTasks();
        if(!tasks) return;

        let btn = document.getElementById('add');
        for (let task in tasks){
            this.addTask(btn,tasks[task],task)
        }
    }
    saveTask(taskNameCont){
        let tasks = this.getTasks();
        if (!tasks) tasks = {};

        if(!taskNameCont.hasAttribute('data-task')) taskNameCont.setAttribute('data-task',`${taskNameCont.textContent}`);
        tasks[`${taskNameCont.getAttribute('data-task')}`] = taskNameCont.textContent;

        this.saveTasks(tasks)
    }
    addHandlers(items){
        items.taskName.addEventListener('focusout', function (e) {
            let taskName = e.target;
            if (taskName.textContent === '') taskName.textContent = this.taskValue;
            else momentum.saveTask(taskName);
        });
        items.taskName.addEventListener('focus', function (e) {
            let taskName = e.target;
            this.taskValue = taskName.textContent;
            setTimeout(function (e) {taskName.textContent = ''},10)
        });
        items.taskBtn.addEventListener('click',function (e) {
            momentum.deleteTask(e);
        })
    }
    addTask(btn, name = '[Enter your task]', attr = null){
        let task = document.createElement('DIV'),
            taskName = document.createElement('DIV'),
            taskBtn = document.createElement('BUTTON');

        task.className = 'task-row';
        taskName.setAttribute('contenteditable','true');
        taskName.textContent = name;
        if(attr) taskName.setAttribute('data-task', attr);

        let cont = document.querySelector('.target');
        task.append(taskName,taskBtn);
        cont.append(task);

        if(cont.children.length === 6) btn.classList.add('add-hidden');
        this.addHandlers({taskName:taskName,taskBtn:taskBtn})
    }
    deleteTask(e){
        let btn = e.target,
            task = btn.parentElement,
            taskName = task.firstChild.getAttribute('data-task');

        let tasks = this.getTasks();

        delete tasks[taskName];
        task.setAttribute('style','transform:scale(0)');
        setTimeout(function (e) {
            task.remove();
        },350);

        this.saveTasks(tasks);

        if(document.querySelector('.target').children.length < 7){
            if (document.getElementById('add').classList.contains('add-hidden')){
                document.getElementById('add').classList.remove('add-hidden')
            }
        }

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
        let greetings = ['Good night,','Good morning,','Good day,','Good evening,'];
        let greetingArea = document.getElementById('greeting');
        if(hour >=0 && hour < 6) greetingArea.textContent = greetings[0];
        if(hour >=6 && hour < 12) greetingArea.textContent = greetings[1];
        if(hour >=12 && hour < 18) greetingArea.textContent = greetings[2];
        if(hour >=18 && hour <= 23) greetingArea.textContent = greetings[3];
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

        if(!localStorage.getItem('momentum-name')) localStorage.setItem('momentum-name','[enter name]');
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

    init(){
        const _ = this;

        _.setGreetings(_.hour);
        _.setBgPicture(_.hour);
        _.nameHandler();
        _.insertTime();
        setInterval(function () {
            _.bgcCheck();
            _.insertTime();
        },1000);
        _.showTasks();
    }
}

let momentum = new Momentum();