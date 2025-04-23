/* example:
let holidays: Holiday = {
    public: {
        "Tahun Baru 2025 Masehi": { "2025-1": [1] },
        "Isra Mikraj Nabi Muhammad SAW": { "2025-1": [27] },
        "Tahun Baru Imlek 2576 Kongzili": { "2025-1": [29] },
        "Hari Suci Nyepi Tahun Baru Saka 1947": { "2025-3": [29] },
        "Hari Raya Idul Fitri 1446 Hijriyah": { "2025-3": [31], "2025-4": [1] },
        "Wafat Yesus Kristus": { "2025-4": [18] },
        "Kebangkitan Yesus Kristus (Paskah)": { "2025-4": [20] },
        "Hari Buruh Internasional": { "2025-5": [1] },
        "Hari Raya Waisak 2569 BE": { "2025-5": [12] },
        "Kenaikan Yesus Kristus": { "2025-5": [29] },
        "Hari Lahir Pancasila": { "2025-6": [1] },
        "Hari Raya Idul Adha 1446 Hijriyah": { "2025-6": [6] },
        "Tahun Baru Islam 1447 Hijriyah": { "2025-6": [27] },
        "Hari Kemerdekaan Republik Indonesia": { "2025-8": [17] },
        "Maulid Nabi Muhammad SAW": { "2025-9": [5] },
        "Hari Raya Natal": { "2025-12": [25] },
    },
    joint: {
        "Tahun Baru Imlek 2576 Kongzili": { "2025-1": [28] },
        "Hari Suci Nyepi Tahun Baru Saka 1947": { "2025-3": [28] },
        "Hari Raya Idul Fitri 1446 Hijriyah": { "2025-4": [2, 3, 4, 7] },
        "Hari Raya Waisak 2569 BE": { "2025-5": [13] },
        "Kenaikan Yesus Kristus": { "2025-5": [30] },
        "Hari Raya Idul Adha 1446 Hijriyah": { "2025-6": [9] },
        "Hari Raya Natal": { "2025-12": [26] },
    },
}
*/
type Holiday = {public: {[key: string]: {[key: string]: number[]}}, joint: {[key: string]: {[key: string]: number[]}}}

let days = [];
for (let i=0; i<7;i++) {
    days.push((new Date(Date.UTC(2017, 0, 1 + i))).toLocaleDateString('default', { weekday: 'short' }));
}

type MonthInfo = {
    days: string[],
    month: string,
    monthShort: string,
    startingDay: number,
    numberOfDay: number,
    get lines(): number,
    dayNum(lines: number, col: number): number|null
    isPublicHoliday(lines: number, col: number): boolean
    isJointHoliday(lines: number, col: number): boolean
    holiday(lines: number, col: number): string
    holidays(): string[]
}

const Calendar = {
    _holidays: {public: {}, joint: {}},
    setHolidays(days: Holiday) {
        this._holidays = days
    },
    getMonthInfo(year: number, month: number, dayStartWithMonday: boolean): MonthInfo {
        const holidays: Holiday = this._holidays
        return {
            days: dayStartWithMonday ? [...days.slice(1), days[0]] : days,
            month: (new Date(year, month, 0)).toLocaleString('default', { month: 'long' }),
            monthShort: (new Date(year, month, 0)).toLocaleString('default', { month: 'short' }),
            startingDay: ((new Date(year, month -1, 1)).getDay() + (dayStartWithMonday? 6 : 7)) % 7,
            numberOfDay: (new Date(year, month, 0)).getDate(),
            get lines() {
                return Math.ceil((this.startingDay + this.numberOfDay) / 7)
            },
            dayNum(lines: number, col: number): number|null {
                const d = lines * 7 + col - this.startingDay + 1;
                if (d < 1 || d > this.numberOfDay) {
                    return null
                } else {
                    return d
                }
            },
            isPublicHoliday(lines: number, col: number): boolean {
                const key = year + "-" + month
                for (const k in holidays.public) {
                    if (holidays.public[k][key] != undefined) {
                        if (holidays.public[k][key].indexOf(this.dayNum(lines, col)??0) >= 0) {
                            return true
                        }
                    }
                }
                return false
            },
            isJointHoliday(lines: number, col: number): boolean {
                const key = year + "-" + month
                for (const k in holidays.joint) {
                    if (holidays.joint[k][key] != undefined) {
                        if (holidays.joint[k][key].indexOf(this.dayNum(lines, col)??0) >= 0) {
                            return true
                        }
                    }
                }
                return false
            },
            holiday(lines: number, col: number): string {
                const key = year + "-" + month
                for (const holidayTypes of [holidays.public, holidays.joint]) {
                    for (const k in holidayTypes) {
                        if (holidayTypes[k][key] != undefined) {
                            if (holidayTypes[k][key].indexOf(this.dayNum(lines, col)??0) >= 0) {
                                return k
                            }
                        }
                    }
                }
                return ""
            },
            holidays(): string[] {
                const key = year + "-" + month
                let list: {[key: string]: number[]} = {}
                for (const k in holidays.public) {
                    if (holidays.public[k][key] != undefined) {
                        if (list[k] == undefined) {
                            list[k] = []
                        }
                        list[k].push(...holidays.public[k][key])
                    }
                }
                for (const k in holidays.joint) {
                    if (holidays.joint[k][key] != undefined) {
                        if (list[k] == undefined) {
                            list[k] = []
                        }
                        list[k].push(...holidays.joint[k][key])
                    }
                }
                let res = []
                for (const k in list) {
                    res.push(list[k].sort().join(", ") + " " + this.monthShort + ": " + k)
                }
                return res
            }

        }
    }
}

export type { Holiday, MonthInfo }
export {Calendar}
