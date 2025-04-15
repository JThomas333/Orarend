import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./date/database.sqlite");

export function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
  export function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }
  export function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });
  }
  
  export async function initializeDatabase() {
    await dbRun("DROP TABLE IF EXISTS timetable;");
    await dbRun(
      "CREATE TABLE IF NOT EXISTS timetable (id INTEGER PRIMARY KEY AUTOINCREMENT, day STRING, ora1 STRING, ora2 STRING, ora3 STRING, ora4 STRING, ora5 STRING, ora6 STRING, ora7 STRING, ora8 STRING, ora9 STRING);"
    );
    const timetable = [
        {day: 'Hétfő', ora1: 'Kűrt', ora2: 'Nagybőgő', ora3: 'Angol', ora4: 'Töri', ora5: 'Angol', ora6: 'Biosz', ora7: 'Matek', ora8: 'Irodalom', ora9: 'Nyelvtan'},
        {day: 'Kedd', ora1: 'Dobb', ora2: 'Lant', ora3: 'Angol', ora4: 'Matek', ora5: 'Töri', ora6: 'Fizika', ora7: 'Tesi', ora8: 'Infó', ora9: 'Infó'},
        {day: 'Szerda', ora1: 'Dance', ora2: 'Hegedű', ora3: 'Nyelvtan', ora4: 'Matek', ora5: 'Fizika', ora6: 'Fizika', ora7: 'Matek', ora8: 'Infó', ora9: 'Töri'},
        {day: 'Csütörtök', ora1: 'Zene', ora2: 'Klarinét', ora3: 'Irodalom', ora4: 'Matek', ora5: 'Matek', ora6: 'Fizika', ora7: 'Matek', ora8: 'Infó', ora9: 'Fizika'},
        {day: 'Péntek', ora1: 'Fishing', ora2: 'Cselló', ora3: 'Matek', ora4: 'Matek', ora5: 'Tesi', ora6: 'Fizika', ora7: 'Angol', ora8: 'Infó', ora9: 'Biosz'},

      ];
  
    for (const t of timetable) {
      await dbRun(
          "INSERT INTO timetable (day, ora1, ora2, ora3, ora4, ora5, ora6, ora7, ora8, ora9) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [
            t.day, t.ora1, t.ora2, t.ora3, t.ora4, t.ora5, t.ora6, t.ora7, t.ora8, t.ora9,
      ]);
    }
  }