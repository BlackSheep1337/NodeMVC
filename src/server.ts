import sequelize from "./models";
import User from "./models/UserModel";






sequelize.sync({ force: true }).then(() => {
  console.log("Database synced")
});