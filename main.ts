namespace dataloggerPRO {

    let columns: string[] = []
    let rows: string[][] = []

    // Add column if not exists
    function ensureColumn(name: string) {
        if (columns.indexOf(name) < 0) {
            columns.push(name)
            for (let r of rows) r.push("")
        }
    }

    // Create new row if needed
    function newRow() {
        let r: string[] = []
        for (let c of columns) r.push("")
        rows.push(r)
    }

    // Log value to column
    //% block="log value %value to column %column"
    export function logValue(value: number, column: string) {
        ensureColumn(column)
        if (rows.length == 0) newRow()
        rows[rows.length - 1][columns.indexOf(column)] = value.toString()
    }

    // Log string to column
    //% block="log string %value to column %column"
    export function logString(value: string, column: string) {
        ensureColumn(column)
        if (rows.length == 0) newRow()
        rows[rows.length - 1][columns.indexOf(column)] = value
    }

    // Start new record
    //% block="new record"
    export function newRecord() {
        newRow()
    }

    // Read all data as CSV
    //% block="read CSV"
    export function readCSV(): string {
        let out = columns.join(",") + "\n"
        for (let r of rows) out += r.join(",") + "\n"
        return out
    }

    // Get number of records
    //% block="number of records"
    export function recordCount(): number {
        return rows.length
    }

    // Get value from row/column
    //% block="get value from row %row column %column"
    export function getValue(row: number, column: string): string {
        let ci = columns.indexOf(column)
        if (ci < 0) return ""
        if (row < 0 || row >= rows.length) return ""
        return rows[row][ci]
    }

    // Delete all data
    //% block="clear log"
    export function clear() {
        columns = []
        rows = []
    }

    // Get list of columns
    //% block="get columns"
    export function getColumns(): string[] {
        return columns
    }
}
