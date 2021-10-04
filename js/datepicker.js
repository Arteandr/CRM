const months = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь",
"Ноябрь","Декабрь"];

class DatePicker {
    constructor(e, withoutTime = false, existDate = null) {
        let date = new Date();
        this.month = date.getMonth();
        this.year = date.getFullYear();

        this.input_el = e;
        this.withoutTime = withoutTime;
        if(existDate) {
            this.selectedTime = existDate.selectedTime;
            this.selectedYear = existDate.selectedYear; 
            this.selectedMonth = existDate.selectedMonth;
            this.selectedDay = existDate.selectedDay;
            this.month = existDate.selectedMonth;
            this.year = existDate.selectedYear;

        }
        console.log(existDate)

    }

    InitEvents() {
        this.date_main = document.querySelector(".date-main");

        this.prev_mth_btn = document.querySelector(".prev-mth");
        this.next_mth_btn = document.querySelector(".next-mth")
        this.close_popup_btn = document.querySelector(".date-picker .close-btn")
        this.apply_btn = document.querySelector(".date-picker .date-btn")
        
        this.time_inputs = document.querySelectorAll(".date-time input");

        this.date_current_month = document.querySelector(".date-current-month");
        this.date_current_year = document.querySelector(".date-current-year");
        this.date_current_month.textContent = months[this.month];
        this.date_current_year.textContent = this.year;

        if(!this.selectedTime)
            this.selectedTime = [];
        
        this.printMonth();

        this.next_mth_btn.addEventListener('click', this.nextMonth.bind(this));
        this.prev_mth_btn.addEventListener('click', this.prevMonth.bind(this));
        this.time_inputs.forEach((el,index) => {
            let max = el.getAttribute("max");
            let min = el.getAttribute("min");
            let o = this;
            el.addEventListener("input", this.changeTime.bind(el, max, min,index,o))
        })
        this.close_popup_btn.addEventListener("click", this.closeIn.bind(this));
        this.apply_btn.addEventListener("click", this.applyInfo.bind(this));
    }

    nextMonth() {
        if(this.month + 1 > 11 && this.year + 1 > new Date().getFullYear()) return;
        this.month++;
        if(this.month > 11) {
            this.month = 0;
            this.year++;
        }
        this.date_current_month.textContent = months[this.month];
        this.date_current_year.textContent = this.year;
    
        this.printMonth()
    
        if(this.month + 1 > 11 && this.year + 1 > new Date().getFullYear()) {
            this.next_mth_btn.style.backgroundImage = "url(../img/right-arr-disable.svg)";
        };
    }
    prevMonth() {
        this.month--;
        if(this.month < 0) {
            this.month = 11;
            this.year--;
        }
        
        this.date_current_month.textContent = months[this.month];
    
        this.date_current_year.textContent = this.year;
    
        this.printMonth()
    
        if(!(this.month + 1 > 11 && this.year + 1 > new Date().getFullYear())) {
           this. next_mth_btn.style.backgroundImage = "url(../img/right-arr-active.svg)";
        };
        
    }
    printMonth() {
        this.date_main.innerHTML = null;
        let days = this.getDaysInYear(this.year);
        let firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
        var lastDayOfMonth = new Date(this.year, this.month + 1, 0).getDay();
    
        // Дни текущего месяца
        let monthArr = [];
    
        // Проверка на воскресенье
        if(firstDayOfMonth !== 0){
            // Добавляем дни не входящие в текущий месяц с начала
            for(let i = (days[this.month - 1 < 0 ? 11 : this.month - 1] - (firstDayOfMonth - 1)) + 1; i <= days[this.month - 1 < 0 ? 11 : this.month - 1]; i++) {
                monthArr.push({day: i,active: false});
            }
        } else {
            // Добавляем дни не входящие в текущий месяц с начала
            for(let i = days[this.month - 1 < 0 ? 11 : this.month - 1] - 5; i <= days[this.month - 1 < 0 ? 11 : this.month - 1]; i++) {
                monthArr.push({day: i,active: false});
            }
        }
        for(let i = 1; i <= days[this.month]; i++) {
            monthArr.push({day: i,active: true});
        }
        // Добавляем дни не входящие в текущий месяц с конца
        if(lastDayOfMonth !== 0){
            for(let i = 1; i <= 7 - lastDayOfMonth; i++) {
                monthArr.push({day: i,active: false});
            }
        }
    
        let rows = monthArr.length / 7;
        let currentEl = 0;
        for(let i = 1; i <= rows; i++) {
            let el = document.createElement("div");
            el.classList += "row"
            for(let j = 1; j <= 7; j++) {
                let innerEl = document.createElement("span");
                if(monthArr[currentEl].active){
                    innerEl.classList += "active";
                    innerEl.addEventListener('click', this.selectDay.bind(this,innerEl));
                }
                if(this.month == this.selectedMonth && this.year == this.selectedYear && monthArr[currentEl].day == this.selectedDay && monthArr[currentEl].active) {
                    innerEl.classList += " selected";
                    this.selectedNode = innerEl;
                }
                    
                innerEl.textContent = monthArr[currentEl].day;
                el.appendChild(innerEl);
                currentEl++;
            }
            this.date_main.appendChild(el);
        }  
    }
    getDaysInYear(y) {
        let f;
        // Проверка на високосность года
        if (y%4 !== 0 || y%100 === 0 && y%400 !== 0){
            f = 28;
        }else {
            f = 29;
        }
        return [31,f,31,30,31,30,31,31,30,31,30,31];
    }
    selectDay(e) {
        if(this.selectedNode) {
            if(this.selectedNode !== e) {
                this.selectedNode.classList.remove("selected")
            } else {
                this.selectedNode.classList.remove("selected")
                this.selectedNode = null;
                this.selectedDay = null;
                this.selectedMonth = null
                this.selectedYear = null;
                return
            }
        };
        this.selectedNode = e;
        this.selectedDay = this.selectedNode.innerText;
        this.selectedMonth = this.month;
        this.selectedYear = this.year;
        
        e.classList += " selected";
    }
    changeTime(max,min,index,o) {
        if(this.value.length > 2) 
            this.value = this.value.slice(0,-1)
        
        if(Number.parseInt(this.value) > max)
            this.value = max;
        if(Number.parseInt(this.value) < min)
            this.value = null;

        o.selectedTime[index] = Number.parseInt(this.value);
    }
    addHTML() {
        this.input_el.target.innerHTML = null;
        let t,m;
        if(this.selectedTime && this.selectedTime.length === 2) {
            t = this.selectedTime[0] < 9 ? '0' + this.selectedTime[0] : this.selectedTime[0];
            m = this.selectedTime[1] < 9 ? '0' + this.selectedTime[1] : this.selectedTime[0]; 
        }
        const html = `
        <div class="date-picker">
        <div class="close-btn"></div>
        <div class="date-header">
            <div class="prev-mth"></div>
            <div class="next-mth"></div>
            <span class="date-current-month header-text"></span> 
            <span class="date-current-year header-text"></span>
        </div>
        <div class="date-main"></div>
        ${
            this.withoutTime ? '' : `
        <div class="date-time">
            <span class="text">Время:</span>
            <input type="number" value="${t ? t : ''}" maxlength="2" max="23" min="0"/>
            <span class="text sep">:</span>
            <input type="number" value="${m ? m : ''}" maxlength="2" max="59" min="0"/>
        </div> `}
        <button class="date-btn">
            Применить
        </button>
    </div>
        `

        this.input_el.target.insertAdjacentHTML("beforeend", html);
        this.InitEvents()
    
    }
    removeEvents()  {
        this.next_mth_btn.removeEventListener('click', this.nextMonth.bind(this));
        this.prev_mth_btn.removeEventListener('click', this.prevMonth.bind(this));
        this.time_inputs.forEach(el => {
            let max = el.getAttribute("max");
            let min = el.getAttribute("min");
            el.removeEventListener("input", this.changeTime.bind(el, max, min))
        })
        this.close_popup_btn.removeEventListener("click", this.closeIn.bind(this));
    }

    isActive() {
        let date_picker = document.querySelector(".date-picker");
        return date_picker ? true : false;
    }
    closeOut() {
        if(this.isActive()) {
            this.input_el.target.innerHTML = null;
            this.removeEvents()
        }
    }
    closeIn() {
        this.input_el.srcElement.firstElementChild.remove()
        this.removeEvents()
    }
    applyInfo(e) {
        e.preventDefault();
        if(!this.selectedYear || !this.selectedDay || !this.selectedMonth) 
            return;
        
        if(!this.withoutTime && (!this.selectedTime[0] || !this.selectedTime[1]))
            return
        let need_date;
        let need_time;
        if(this.withoutTime){
            need_date = e.target.parentElement.parentElement.parentElement.children[0].children[1].children[0];
        } else {
            need_date = e.target.parentElement.parentElement.parentElement.children[0].children[0].children[0];
            need_time = e.target.parentElement.parentElement.parentElement.children[0].children[0].children[1];
        }
        need_date.textContent = `${this.selectedDay < 10 ? '0'+this.selectedDay : this.selectedDay}.${Number.parseInt(this.selectedMonth)+1 < 10 ? '0' + (this.selectedMonth+1) : this.selectedMonth + 1}.${this.selectedYear}`;
        if(!this.withoutTime)
            need_time.textContent = `${this.selectedTime[0] < 10 ? '0'+this.selectedTime[0] : this.selectedTime[0]}:${this.selectedTime[1] < 10 ? '0'+this.selectedTime[1] : this.selectedTime[1]}`;
        this.closeIn();
    }
}

export default DatePicker;