export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        console.log("View: " + this.view.toString());
        console.log("Model: " + this.model.toString());
    }
}