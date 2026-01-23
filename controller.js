export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.model.setRenderedDate(new Date());
        const month = this.model.getMonth();
        const firstDay = this.model.getFirstDay();
        const numOfDays = this.model.getMonthDays();
        this.view.renderMonthHeader(month);
        this.view.renderMonthGrid(firstDay, numOfDays);
    }
}