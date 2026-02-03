import Model from "./model.js";
const model = new Model();
const mockSpecDays = [
    {
        "name": "Test special day 1",
        "monthName": "February",
        "dayName": "Tuesday",
        "occurrence": "last",
        "descriptionURL": "url"
    },
    {
        "name": "Test special day 2",
        "monthName": "May",
        "dayName": "Saturday",
        "occurrence": "second",
        "descriptionURL": "url"
    }
]

test("Correct first day of month", () => {
    expect(model.getFirstDay(new Date(1900, 11, 1))).toEqual(6);
    expect(model.getFirstDay(new Date(2026, 1, 1))).toEqual(0);
    expect(model.getFirstDay(new Date(2026, 2, 1))).toEqual(0);
    expect(model.getFirstDay(new Date(2053, 0, 1))).toEqual(3);
});

test("Correct number of days of month", () => {
    expect(model.getMonthDays(new Date(1900, 11, 1))).toEqual(31);
    expect(model.getMonthDays(new Date(2026, 1, 1))).toEqual(28);
    expect(model.getMonthDays(new Date(2026, 2, 1))).toEqual(31);
    expect(model.getMonthDays(new Date(2053, 0, 1))).toEqual(31);
});

test("Correct special day date", () => {
    model.setRenderedDate(new Date('2026-02-01'));
    expect(model.findDateByOccurrence(
        model.getDayNames().indexOf(mockSpecDays[0].dayName),
        mockSpecDays[0].occurrence,
        model.getFirstDay(),
        model.getMonthDays())
    ).toEqual(24);
    model.setRenderedDate(new Date('2020-05-01'));
    expect(model.findDateByOccurrence(
        model.getDayNames().indexOf(mockSpecDays[1].dayName),
        mockSpecDays[1].occurrence,
        model.getFirstDay(),
        model.getMonthDays())
    ).toEqual(9);
});
