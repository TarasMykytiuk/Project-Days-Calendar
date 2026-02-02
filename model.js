export default class Model {
    #renderedDate
    #specDays
    #monthNames
    #dayNames
    #dayOccurrence
    constructor() {
        this.#renderedDate = '';
        this.#specDays = [];
        this.#monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.#dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.#dayOccurrence = ["first", "second", "third", "fourth"];
    }

    async loadSpecDays() {
        const specDays = await fetch("./days.json").then(res => res.json());
        this.#specDays = specDays;
    }

    calcSpecDates(firstDay, numOfDays) {
        firstDay = !firstDay ? this.getFirstDay() : firstDay;
        numOfDays = !numOfDays ? this.getMonthDays() : numOfDays;
        const atCurMonth = this.#specDays.filter((day) => {
            return day.monthName == this.#monthNames[new Date(this.#renderedDate).getMonth()];
        })
        atCurMonth.forEach((day) => {
            day["date"] = this.findDateByOccurrence(
                this.#dayNames.indexOf(day.dayName),
                day.occurrence,
                firstDay,
                numOfDays
            )
        })
        return atCurMonth;
    }

    findDateByOccurrence(specDayNum, occurrence, firstDay, numOfDays) {
        if (occurrence == "last") {
            const lastDay = new Date(this.#renderedDate.getFullYear(), this.#renderedDate.getMonth(), numOfDays).getDay();
            const diff = specDayNum - lastDay;
            return diff > 0 ? numOfDays + diff - 7 : numOfDays + diff;
        } else {
            const occNum = this.#dayOccurrence.indexOf(occurrence) + 1;
            const diff = specDayNum - firstDay;
            if (diff < 0) {
                return 7 + diff + 7 * (occNum - 1) + 1;
            } else {
                return diff + 7 * (occNum - 1) + 1;
            }
        }
    }

    getMonthNames() {
        return this.#monthNames;
    }

    getRenderedDate() {
        return this.#renderedDate;
    }

    setRenderedDate(date) {
        this.#renderedDate = date;
    }

    getMonth(date) {
        return date ? date.getMonth() : this.#renderedDate.getMonth();
    }

    changeMonth(buttonId) {
        const change = buttonId == "prev" ? -1 : +1;
        return new Date(this.#renderedDate.getFullYear(), this.#renderedDate.getMonth() + change);
    }

    getMonthDays(date) {
        const year = date ? date.getFullYear() : this.#renderedDate.getFullYear();
        const month = date ? date.getMonth() : this.#renderedDate.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstDay(date) {
        const dateCopy = date
            ? new Date(date.getFullYear(), date.getMonth(), 1)
            : new Date(this.#renderedDate.getFullYear(), this.#renderedDate.getMonth(), 1);
        return dateCopy.getDay();
    }
}