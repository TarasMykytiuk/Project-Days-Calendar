export default class View {
    #elements
    constructor() {
        this.#elements = {
            monthNameDom: document.getElementById("month_name"),
            prevBtn: document.getElementById("prev"),
            nextBtn: document.getElementById("next"),
            calCont: document.getElementById("calendar_container"),
            monthSelect: document.getElementById("month_selector"),
            yearSelect: document.getElementById("year_selector"),
            setDateBtn: document.getElementById("set_date_button")
        }
    }

    bindMonthChange(handler) {
        this.#elements.prevBtn.addEventListener("click", (event) => {
            handler(event);
        })
        this.#elements.nextBtn.addEventListener("click", (event) => {
            handler(event);
        })
    }

    bindSetDate(handler) {
        this.#elements.setDateBtn.addEventListener("click", (event) => {
            const month = this.#elements.monthSelect.value;
            const year = this.#elements.yearSelect.value;
            handler(month, year, event);
        })
    }

    populateMonthSelect(curMonthNum, monthNames) {
        for (let i = 0; i < 12; i++) {
            this.addOption(this.#elements.monthSelect, i, monthNames[i]);
        }
        this.#elements.monthSelect.value = curMonthNum;
    }

    populateYearsSelect(curYear, range) {
        for (let i = curYear - range; i < curYear + range; i++) {
            this.addOption(this.#elements.yearSelect, i, i);
        };
        this.#elements.yearSelect.value = curYear;
    }

    addOption(selectDom, value, text) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        selectDom.appendChild(option);
    }

    clearMonthContainer() {
        this.#elements.calCont.innerHTML = "";
    }

    changeMonthName(monthName) {
        const monthNameDom = this.#elements.monthNameDom;
        monthNameDom.textContent = monthName;
    }

    renderMonthGrid(firstDay, totalMonthDays) {
        let firstEmptyCells = firstDay;
        let dateToRender = 1;
        const rowsNum = Math.ceil((totalMonthDays + firstEmptyCells) / 7);
        for (let i = 0; i < rowsNum; i++) {
            const monthRow = document.createElement("div");
            monthRow.classList = "days_row";
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement("div");
                cell.classList = "day_cell";
                if (dateToRender <= totalMonthDays && firstEmptyCells <= 0) {
                    const numDom = document.createElement("p");
                    numDom.textContent = dateToRender;
                    cell.id = "day_" + dateToRender;
                    dateToRender++;
                    cell.appendChild(numDom);
                }
                monthRow.appendChild(cell);
                firstEmptyCells--;
            }
            this.#elements.calCont.appendChild(monthRow)
        }
    }

    renderSpecDays(specDays) {
        specDays.forEach((day) => {
            const cell = document.getElementById("day_" + day.date);
            const a = document.createElement("a");
            a.textContent = day.name;
            a.href = day.descriptionURL;
            cell.appendChild(a);
        });
    }
}