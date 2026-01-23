export default class View {
    #elements
    #dayNames
    #monthNames
    constructor() {
        this.#elements = {
            calCont: document.getElementById("calendar_container")
        }
        this.#dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        this.#monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }

    renderMonthHeader(month) {
        const monthNameDom = document.createElement("h1");
        monthNameDom.textContent = this.#monthNames[month];
        const headerRow = document.createElement("div");
        headerRow.id = "header_row";
        this.#dayNames.forEach((day) => {
            const cell = document.createElement("div");
            cell.classList = "header_cell"
            cell.textContent = day;
            headerRow.append(cell);
        })
        this.#elements.calCont.appendChild(monthNameDom);
        this.#elements.calCont.appendChild(headerRow);
    }

    renderMonthGrid(firstDay, totalMonthDays) {
        let firstEmptyCells = firstDay - 1;
        let dateToRender = 1;
        const rowsNum = Math.ceil((totalMonthDays + firstEmptyCells) / 7);
        for (let i = 0; i < rowsNum; i++) {
            const monthRow = document.createElement("div");
            monthRow.classList = "month_row";
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("div");
                cell.classList = "month_cell";
                if (dateToRender <= totalMonthDays && firstEmptyCells <= 0) {
                    const numDom = document.createElement("p");
                    numDom.textContent = dateToRender;
                    dateToRender++;
                    cell.appendChild(numDom);
                }
                monthRow.appendChild(cell);
                firstEmptyCells--;
            }
            this.#elements.calCont.appendChild(monthRow)
        }
    }
}