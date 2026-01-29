export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        const curDate = new Date();
        this.model.setRenderedDate(curDate);
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
        this.view.populateMonthSelect(date.getMonth());
        this.view.populateYearsSelect(date.getFullYear(), 150);
    }

    renderCalendarGrid() {
        const month = this.model.getMonth();
        const firstDay = this.model.getFirstDay();
        const numOfDays = this.model.getMonthDays();
        this.view.clearMonthContainer();
        this.view.changeMonthName(month);
        this.view.renderMonthGrid(firstDay, numOfDays);
    }
}