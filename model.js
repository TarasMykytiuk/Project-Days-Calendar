export default class Model {
    #renderedDate
    constructor() {
        this.#renderedDate = '';
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

    getMonthDays(date) {
        const year = date ? date.getFullYear() : this.#renderedDate.getFullYear();
        const month = date ? date.getMonth() : this.#renderedDate.getMonth();
        return new Date(year, month, 0).getDate();
    }

    getFirstDay(date) {
        const dateCopy = date
            ? new Date(date.getFullYear(), date.getMonth(), 1)
            : new Date(this.#renderedDate.getFullYear(), this.#renderedDate.getMonth(), 1);
        return dateCopy.getDay();
    }
}