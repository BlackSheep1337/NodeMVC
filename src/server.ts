import sequelize from "./models";
import User from "./models/User";






sequelize.sync({ force: true }).then(() => {
  console.log("Database synced")
});