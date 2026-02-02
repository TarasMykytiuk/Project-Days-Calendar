export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    async init() {
        const curDate = new Date();
        this.model.setRenderedDate(curDate);
        await this.model.loadSpecDays();
        this.renderCalendarTop(curDate);
        this.renderCalendarGrid();
        this.view.bindMonthChange((event) => this.changeMonthHandler(event));
        this.view.bindSetDate((month, year, event) => this.setDateHandler(month, year, event));
    }

    changeMonthHandler(event) {
        const buttonId = event.target.id;
        const newDate = this.model.changeMonth(buttonId);
        this.model.setRenderedDate(newDate);
        this.renderCalendarGrid();
    }

    setDateHandler(month, year, event) {
        const date = new Date(year, month, 1);
        this.model.setRenderedDate(date);
        this.renderCalendarGrid();
    }

    renderCalendarTop(date) {
        const monthNames = this.model.getMonthNames();
        this.view.populateMonthSelect(date.getMonth(), monthNames);
        this.view.populateYearsSelect(date.getFullYear(), 150);
    }

    renderCalendarGrid() {
        const monthNames = this.model.getMonthNames();
        const month = this.model.getMonth();
        const firstDay = this.model.getFirstDay();
        const numOfDays = this.model.getMonthDays();
        const specDays = this.model.calcSpecDates(firstDay, numOfDays);
        this.view.clearMonthContainer();
        this.view.changeMonthName(monthNames[month]);
        this.view.renderMonthGrid(firstDay, numOfDays);
        this.view.renderSpecDays(specDays);
    }
}