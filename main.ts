//% color=#ff8800 icon="\uf1c0" block="Datalogger PRO"
namespace dataloggerPRO {

    let columns: string[] = []
    let rows: string[][] = []

    function ensureColumn(name: string) {
        if (columns.indexOf(name) < 0) {
            columns.push(name)
            for (let r of rows) r.push("")
        }
    }

    function newRow() {
        let r: string[] = []
        for (let c of columns) r.push("")
        rows.push(r)
    }

    //% block="log value %value to column %column"
    export function logValue(value: number, column: string) {
        ensureColumn(column)
        if (rows.length == 0) newRow()
        rows[rows.length - 1][columns.indexOf(column)] = value.toString()
    }

    //% block="log text %value to column %column"
    export function logString(value: string, column: string) {
        ensureColumn(column)
        if (rows.length == 0) newRow()
        rows[rows.length - 1][columns.indexOf(column)] = value
    }

    //% block="new record"
    export function newRecord() {
        newRow()
    }

    //% block="read CSV"
    export function readCSV(): string {
        let out = columns.join(",") + "\n"
        for (let r of rows) out += r.join(",") + "\n"
        return out
    }

    //% block="number of records"
    export function recordCount(): number {
        return rows.length
    }

    //% block="get value from row %row column %column"
    export function getValue(row: number, column: string): string {
        let ci = columns.indexOf(column)
        if (ci < 0) return ""
        if (row < 0 || row >= rows.length) return ""
        return rows[row][ci]
    }

    //% block="clear log"
    export function clear() {
        columns = []
        rows = []
    }

    //% block="get columns"
    export function getColumns(): string[] {
        return columns
    }
}
