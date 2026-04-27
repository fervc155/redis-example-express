const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./test.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER
    )
  `);

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (err) {
      console.error(err);
      return;
    }

    if (row.count === 0) {
      console.log("Insertando datos de prueba...");

      const stmt = db.prepare(
        "INSERT INTO products (name, price) VALUES (?, ?)",
      );

      for (let i = 1; i <= 1000; i++) {
        stmt.run(`producto_${i}`, Math.floor(Math.random() * 1000));
      }

      console.log("...listo insertado ");

      stmt.finalize();
    } else {
      console.log("La DB ya tiene datos");
    }
  });
});

module.exports = db;
