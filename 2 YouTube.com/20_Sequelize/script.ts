const db = require("./models/index");

const { sequelize } = db;

async function main() {
  // await sequelize.sync({ alter: true });
  await sequelize.sync({ force: true });
}

main();
